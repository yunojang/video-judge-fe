import { css, cx, keyframes } from '@emotion/css';
import { useMemo } from 'react';
import { Error, ERR_EMOJI, HttpErrorCode } from './types';

type Position = 'inline' | 'center' | 'float';
const ErrorMsg = ({
  error,
  position = 'center',
}: {
  error: Error;
  position?: Position;
}) => {
  const { code, message } = error;
  const emoji = useMemo(() => {
    switch (code) {
      case 401:
        return ERR_EMOJI[HttpErrorCode.Unauth];
      case 403:
        return ERR_EMOJI[HttpErrorCode.Forbidden];
      case 404:
        return ERR_EMOJI[HttpErrorCode.NotFound];
      case 408:
        return ERR_EMOJI[HttpErrorCode.Timeout];
      case 400:
      default:
        return ERR_EMOJI[HttpErrorCode.ClientError];
    }
  }, [code]);

  return (
    <div className={cx(style, position)}>
      <span className="emoji">{emoji}</span>
      <span className="message">{`[${code}] ${message}`}</span>
    </div>
  );
};

export default ErrorMsg;

const emojiAnimation = keyframes`
  0% {
    transform: rotate(-15deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-15deg);
  }
`;

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

  & > .emoji {
    font-size: 150px;
    animation: ${emojiAnimation} 1.5s ease-in-out infinite;
  }

  & > .message {
    color: #000000;
    font-size: 22px;
    margin-top: 1.2em;
    font-weight: bold;
  }
`;
