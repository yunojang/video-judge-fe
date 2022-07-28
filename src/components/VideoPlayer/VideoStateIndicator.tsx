import { css, keyframes } from '@emotion/css';
import { GearIcon, PlugIcon, XCircleFillIcon } from '@wizrnd/nx-ui';
import { RTCState } from 'src/utils/webrtc';

const RotateGear = () => (
  <div className="loading">
    <GearIcon size="large" />
  </div>
);

const MESSAGE = {
  new: {
    icon: <></>,
    text: 'Making Conncetion',
  },
  checking: {
    icon: <RotateGear />,
    text: 'Checking Connection',
  },
  error: {
    icon: <XCircleFillIcon size="large" />,
    text: `Can not Connect`,
  },
  disconnected: {
    icon: <PlugIcon size="large" />,
    text: 'Disconnected',
  },
};

type MessageKey = 'new' | 'checking' | 'error';
const VideoStateIndicator = ({ state }: { state: RTCState }) => {
  const indicator = MESSAGE[state as MessageKey];

  return (
    <div className={style}>
      {indicator && (
        <>
          <div className="icon">{indicator.icon}</div>
          <div>{indicator.text}</div>
        </>
      )}
    </div>
  );
};

export default VideoStateIndicator;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const style = css`
  width: 100%;
  height: 100%;
  background-color: #353535;
  color: #f5f5f5;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  gap: 4px;

  .loading {
    animation: ${rotate} 2s infinite;
    display: inline-block;
  }
`;
