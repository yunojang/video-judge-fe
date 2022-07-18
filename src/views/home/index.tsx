import { css } from '@emotion/css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/store';
import { fetch } from 'src/reducer/dashboard';

import ErrorMsg from 'src/components/ErrorMsg';
import Loading from 'src/components/Loading';
import VideoPlayer from 'src/components/VideoPlayer';

const TEST_CV_URL = 'http://localhost:8888';

const Home = () => {
  const dispatch = useDispatch();
  const {
    current: dashboard,
    error,
    loading,
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  const style = makeStyles();
  return error ? (
    <ErrorMsg msg={error} />
  ) : loading ? (
    <Loading />
  ) : !dashboard.length ? (
    <div>Add Used Channel</div>
  ) : (
    <div className={style.container}>
      {dashboard.map(channel => (
        <div key={channel.id}>
          <VideoPlayer
            multipart
            url={`${TEST_CV_URL}/api/video_feed?url=${channel.cameraSrc}`}
            height="100%"
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

const makeStyles = () => {
  const container = css`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    padding: 1em;
    box-sizing: border-box;
    // temp
    height: calc(100vh - 42px);

    & > div {
      background-color: #f5f5f5;
      text-align: center;
    }

    & > div > img {
      height: 100%;
    }
  `;

  return {
    container,
  };
};
