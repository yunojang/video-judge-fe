// render video stream img & webRTC
const TEST_OPENCV_URL = 'http://localhost:8888';

const VideoTest = () => {
  return (
    <div>
      <h1>Video Test img, stream</h1>
      <img width="100%" src={`${TEST_OPENCV_URL}/api/video_feed?url=123`} />
    </div>
  );
};

export default VideoTest;
