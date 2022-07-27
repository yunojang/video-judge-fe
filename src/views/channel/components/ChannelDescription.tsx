import { ChannelObject } from 'src/model/channel';
import { Button, TextInput, Title1, Tooltip } from '@wizrnd/nx-ui';
import { css } from '@emotion/css';
import { useDispatch } from 'react-redux';
import { setPrviewUrl } from 'src/reducer/channel';

interface DescriptionProps {
  channel: ChannelObject;
  handleChangeUrl: (url: string) => void;
  handleChangePreview: (url: string) => void;
}

const ChannelDescription = ({
  channel,
  handleChangeUrl,
  handleChangePreview,
}: DescriptionProps) => {
  const dispatch = useDispatch();

  const { cameraSrc } = channel;
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
            value={cameraSrc}
            onChange={e => handleChangeUrl(e.target.value)}
            variant={'underlined'}
          />
          <Tooltip arrow title="Show video preview">
            <Button
              variant="contained"
              color="#5a5a5a"
              onClick={() => handleChangePreview(cameraSrc)}
            >
              Preview
            </Button>
          </Tooltip>
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
    gap: 1em;
    margin-bottom: 8px;
  }

  .url-input {
    flex: 1;
    display: flex;
    gap: 0.5em;
  }
`;
