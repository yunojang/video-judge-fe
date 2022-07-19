import { css, cx } from '@emotion/css';

type Position = 'absolute' | 'inline';

interface PlayerProps {
  multipart?: boolean;
  width?: string | number;
  height?: string | number;
  url?: string;
  position?: Position;
}

// const TEST_CV_URL = 'http://localhost:8888';
const TEST_CV_URL = 'http://10.1.1.201:28084';

const VideoPlayer = ({
  multipart = false,
  width,
  height,
  url,
  position = 'inline',
}: PlayerProps) => {
  const className = cx(style, position);
  return !multipart ? (
    <video
      src={url}
      width={width}
      height={height}
      autoPlay
      loop
      className={className}
    />
  ) : (
    <img
      // src={`${TEST_CV_URL}/api/video_feed?url=${url}`}
      src={`${TEST_CV_URL}/api/channel/play?url=${url}`}
      width={width}
      height={height}
      className={className}
    />
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
