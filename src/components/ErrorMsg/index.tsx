import { css, cx } from '@emotion/css';
import { Error } from './types';

type Position = 'inline' | 'center' | 'float';
const ErrorMsg = ({
  error,
  position = 'center',
}: {
  error: Error;
  position?: Position;
}) => {
  const { code, message } = error;

  return (
    <div className={cx(style, position)}>
      <span>{`[${code}] ${message}`}</span>
    </div>
  );
};

export default ErrorMsg;

const style = css`
  font-size: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.inline {
    margin: 2em;
  }

  &.float {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.center {
    display: flex;
    margin: 1em auto;
  }
`;
