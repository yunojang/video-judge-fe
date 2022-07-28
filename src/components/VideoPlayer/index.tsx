import { css, cx } from '@emotion/css';
import { useEffect, useRef } from 'react';

import { RTCState } from 'src/utils/webrtc';
import VideoStateIndicator from './VideoStateIndicator';

type Position = 'absolute' | 'inline';

interface PlayerProps {
  width?: string | number;
  height?: string | number;
  position?: Position;
  url?: string;
  stream?: MediaStream;
  streamState: RTCState;
  // state?: VideoState;
}

// const TEST_CV_URL = 'http://localhost:8888';

const VideoPlayer = ({
  width,
  height,
  url,
  stream,
  streamState,
  position = 'inline',
}: PlayerProps) => {
  const className = cx(style, position);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current || !stream) {
      return;
    }

    ref.current.srcObject = stream;
  }, [stream]);

  return (
    <div className={className} style={{ width, height }}>
      {streamState === 'connected' ? (
        <video ref={ref} src={url} height="100%" autoPlay playsInline />
      ) : (
        <VideoStateIndicator state={streamState} />
      )}
    </div>
  );
};

export default VideoPlayer;

const style = css`
  text-align: center;

  &.static {
    position: static;
    margin: 0 auto;
  }

  &.absolute {
    position: absolute;
    inset: 0;
  }
`;
