import { useEffect, useMemo, useState } from 'react';
import Webrtc from 'src/utils/webrtc';

const remoteUrl = 'http://localhost:8889/offer';

const useRtc = (defaultUrl?: string) => {
  const rtc = useMemo(() => new Webrtc({ remoteUrl }), []);

  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(defaultUrl);
  const [connectState, setConnectState] = useState(rtc.pc.iceConnectionState);

  useEffect(() => {
    if (url) {
      rtc.negotiate({ url });
    }

    return () => {
      console.log(' useRTC effect cleanup');
    };
  }, [url, rtc]);

  useEffect(() => {
    const handleIceState = () => {
      setConnectState(rtc.pc.iceConnectionState);
    };
    rtc.pc.addEventListener('iceconnectionstatechange', handleIceState);

    const handleTrack = (evt: RTCTrackEvent) => {
      setStream(evt.streams[0]);
    };
    rtc.pc.addEventListener('track', handleTrack);

    return () => {
      rtc.pc.removeEventListener('iceconnectionstatechange', handleIceState);
      rtc.pc.removeEventListener('track', handleTrack);
    };
  }, [rtc.pc]);

  const setCamera = (cameraUrl: string) => {
    setUrl(cameraUrl);
    rtc.negotiate({ url: cameraUrl });
  };

  return { url, stream, connectState, setCamera };
};

export default useRtc;
