import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { ReactChild } from 'react';

interface SealProps {
  children: ReactChild;
  color?: string;
  sealing?: boolean;
  transparence?: boolean;
}

const Seal = ({
  children,
  color = '#aaa',
  sealing = true,
  transparence = false,
}: SealProps) => {
  const style = makeStyle(color, transparence);

  if (!sealing) {
    return <>{children};</>;
  }

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

const makeStyle = (color: string, transparence: boolean) => ({
  container: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  seal: css`
    background-color: ${color};
    z-index: 1;
    position: absolute;
    inset: 0;
    ${transparence
      ? css`
          opacity: 0;
        `
      : css`
          animation: ${breath} 1.5s ease-in-out infinite;
        `}
  `,

  wrapped: css``,
});
