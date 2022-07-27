import { css, cx } from '@emotion/css';
import { useEffect, useRef } from 'react';

type Position = 'absolute' | 'inline';

interface PlayerProps {
  width?: string | number;
  height?: string | number;
  position?: Position;
  url?: string;
  stream?: MediaStream;
  // state?: VideoState;
}

// const TEST_CV_URL = 'http://localhost:8888';

const VideoPlayer = ({
  width,
  height,
  url,
  stream,
  position = 'inline',
}: PlayerProps) => {
  const className = cx(style, position);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current || !stream) {
      return;
    }
    console.log(ref.current, stream);
    ref.current.srcObject = stream;
  }, [stream]);

  return (
    <div className={className} style={{ width, height }}>
      <video
        ref={ref}
        src={url}
        width="100%"
        height="100%"
        autoPlay
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;

const style = css`
  &.static {
    position: static;
    margin: 0 auto;
  }

  &.absolute {
    position: absolute;
    inset: 0;
  }
`;
