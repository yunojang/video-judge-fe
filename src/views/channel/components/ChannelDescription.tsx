import { ChannelObject } from 'src/model/channel';
import { Button, TextInput, Title1 } from '@wizrnd/nx-ui';
import { css } from '@emotion/css';

interface DescriptionProps {
  channel: ChannelObject;
  handleChangeUrl: (url: string) => void;
}

const ChannelDescription = ({ channel, handleChangeUrl }: DescriptionProps) => {
  return (
    <div className={style}>
      <div className="channel-info-feild">
        <Title1>Channel Name: </Title1>
        <span>{channel.channelName}</span>
      </div>
      <div className="channel-info-feild">
        <Title1>Description: </Title1>
        <span>{channel.description}</span>
      </div>
      <div className="channel-info-feild">
        <Title1>Camera URL: </Title1>
        <div className="url-input">
          <TextInput
            fullWidth
            value={channel.cameraSrc}
            onChange={e => handleChangeUrl(e.target.value)}
            variant={'underlined'}
          />
          <Button>Preview</Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelDescription;

const style = css`
  .channel-info-feild {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .url-input {
    flex: 1;
    display: flex;
    gap: 4px;
  }
`;
