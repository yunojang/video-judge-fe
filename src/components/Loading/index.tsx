import { FC } from 'react';
import { cx, css } from '@emotion/css';
import { Spinner, useTheme } from '@wizrnd/nx-ui';

type Position = 'float' | 'inline' | 'center';

interface LoadingProps {
  position?: Position;
  className?: string;
  color?: string;
  size?: number;
}

const Loading: FC<LoadingProps> = ({
  position = 'float',
  color: color_,
  className,
  size,
}) => {
  const theme = useTheme();
  const color = color_ ?? theme.palette.primary.main;

  return (
    <div className={cx(style, position, className)}>
      <Spinner size={size} color={color} />
    </div>
  );
};

export default Loading;

const style = css`
  z-index: 2;
  margin: 10px;

  &.float {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.inline {
    display: inline-block;
    margin: 0px;
  }

  &.center {
    display: block;
    margin: 10px auto;
    width: fit-content;
  }
`;
