interface PlayerProps {
  multipart?: boolean;
  width: number;
  height: number;
  url?: string;
}

const TEST_CV_URL = 'http://localhost:8888';

const VideoPlayer = ({
  multipart = false,
  width,
  height,
  url,
}: PlayerProps) => {
  return !multipart ? (
    <video
      style={{ position: 'absolute', inset: 0 }}
      src={url}
      width={width}
      height={height}
      autoPlay
      loop
    />
  ) : (
    <img
      style={{ position: 'absolute', inset: 0 }}
      src={`${TEST_CV_URL}/api/video_feed?url=${url}`}
      // src={'http://10.1.1.201:28084/api/channel/play/60'}
      width={width}
      height={height}
    />
  );
};

export default VideoPlayer;
