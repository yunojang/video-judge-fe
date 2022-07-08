interface PlayerProps {
  width: number;
  height: number;
  url?: string;
}

const VideoPlayer = ({ width, height, url }: PlayerProps) => {
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
