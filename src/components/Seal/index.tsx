import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { ReactChild } from 'react';

interface SealProps {
  children: ReactChild;
  color?: string;
}

const Seal = ({ children, color = '#333' }: SealProps) => {
  const style = makeStyle(color);

  return (
    <div className={style.container}>
      <div className={style.seal}></div>
      <div className={style.wrapped}>{children}</div>
    </div>
  );
};

export default Seal;

const breath = keyframes`
  0% {
    opacity: 0.15;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 0.15;
  }
`;

const makeStyle = (color: string) => ({
  container: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  seal: css`
    background-color: ${color};
    animation: ${breath} 2s ease-in-out infinite;
    z-index: 1;
    position: absolute;
    inset: 0;
  `,

  wrapped: css``,
});
