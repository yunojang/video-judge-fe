import { useEffect, useMemo, useState } from 'react';
import Webrtc, { RTCState } from 'src/utils/webrtc';
import useComponentDidUnMount from './useComponentDidUnMount';

const remoteUrl = 'http://localhost:8889/offer';

const useRtc = (defaultUrl?: string) => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(defaultUrl);
  const [connectState, setConnectState] = useState<RTCState>('new');

  const rtc = useMemo(
    () => new Webrtc({ remoteUrl, onChangeState: setConnectState }),
    [],
  );

  useComponentDidUnMount(() => {
    rtc.stop();
  });

  useEffect(() => {
    if (url) {
      rtc.negotiate({ url });
    }
  }, [url, rtc]);

  useEffect(() => {
    const handleTrack = (evt: RTCTrackEvent) => {
      setStream(evt.streams[0]);
    };
    rtc.pc.addEventListener('track', handleTrack);

    return () => {
      rtc.pc.removeEventListener('track', handleTrack);
    };
  }, [rtc.state, rtc.pc, connectState]);

  const setCamera = (cameraUrl: string) => {
    setUrl(cameraUrl);
    rtc.negotiate({ url: cameraUrl });
  };

  return { url, stream, connectState, setCamera };
};

export default useRtc;
