import { css } from '@emotion/css';

const Home = () => {
  const style = makeStyles();
  return (
    <div className={style.container}>
      <div>
        <div>CAM1</div>
      </div>
      <div>
        <div>CAM2</div>
      </div>
      <div>
        <div>CAM3</div>
      </div>
      <div>
        <div>CAM4</div>
      </div>
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
    height: calc(100vh - 42px);
  `;

  return {
    container,
  };
};
