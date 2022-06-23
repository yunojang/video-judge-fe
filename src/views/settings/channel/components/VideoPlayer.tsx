interface PlayerProps {
  width: number;
  height: number;
  url?: string;
}

const test_url =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';

const VideoPlayer = ({ width, height, url = test_url }: PlayerProps) => {
  return (
    <video
      style={{ width, height, position: 'absolute', inset: 0 }}
      src={url}
      autoPlay
      loop
    />
  );
};

export default VideoPlayer;
