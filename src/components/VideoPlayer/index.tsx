import { css, cx } from '@emotion/css';

type Position = 'absolute' | 'static';

interface PlayerProps {
  multipart?: boolean;
  width?: string | number;
  height?: string | number;
  url?: string;
  position?: Position;
}

const TEST_CV_URL = 'http://localhost:8888';

const VideoPlayer = ({
  multipart = false,
  width,
  height,
  url,
  position = 'static',
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
      src={`${TEST_CV_URL}/api/video_feed?url=${url}`}
      // src={`http://10.1.1.201:28084/api/channel/play?url=${url}`}
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
