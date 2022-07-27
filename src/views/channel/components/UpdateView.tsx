import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { css, Global } from '@emotion/react';
import { Button, H5, Header, Switch, useTheme } from '@wizrnd/nx-ui';

import { AreaState, ChannelState } from '../type';

import AreaEditor from './AreaEditor';
import AreaTab from './AreaTab';
import AreaDetail from './AreaDetail';
import ChannelDescription from './ChannelDescription';

interface ChannelProps {
  isNew: boolean;
  channel: ChannelState;
  area: AreaState;
  stream?: MediaStream;
  addArea: () => void;
  handleChangePreview: (url: string) => void;
  handleChangeArea: (key: number) => void;
  handleSubmit: () => void;
}

const UpdateView = ({
  isNew,
  channel,
  area,
  addArea,
  stream,
  handleChangePreview,
  handleChangeArea,
  handleSubmit,
}: ChannelProps) => {
  const { t } = useTranslation();

  const submitBtnContent = useMemo(
    () => (isNew ? t('ADD') : t('UPDATE')),
    [t, isNew],
  );

  const { channelArea, channelName, useAlarm, useChannel, useSend } =
    channel.current;

  return (
    <main>
      <Header>
        <input
          className="title-input"
          value={channelName}
          onChange={e => {
            channel.changeName(e.target.value);
          }}
        />
        <Button
          width={100}
          variant="outlined"
          color="#d5ebff"
          onClick={handleSubmit}
        >
          {submitBtnContent}
        </Button>
      </Header>

      <Style />
      <div className="container">
        <div className="channel-viewer">
          <AreaEditor area={area} list={channelArea} stream={stream} />

          <div className="channel-description">
            <ChannelDescription
              channel={channel.current}
              handleChangeUrl={channel.changeCameraUrl}
              handleChangePreview={handleChangePreview}
            />
          </div>
        </div>

        <div className="channel-settings">
          <H5 style={{ marginBottom: '1em' }}>Settings</H5>
          <div className="switch-setting">
            Use Channel:
            <Switch
              checked={useChannel}
              onClick={channel.toggleUseChannel}
              size="md"
            />
          </div>
          <div className="switch-setting">
            Use Alarm:
            <Switch checked={useAlarm} size="md" disabled={!useChannel} />
          </div>

          <div>
            <div className="area-tab-wapper">
              <AreaTab
                areas={channelArea}
                selected={area.selected}
                handleChange={handleChangeArea}
              />
              <Button onClick={addArea} iconName="PlusIcon" size="md" />
            </div>

            <div className="area-description">
              {area.current && (
                <AreaDetail
                  area={area.current}
                  handleDelete={area.delete}
                  handleChangeColor={area.changeColor}
                />
              )}
            </div>

            <div className="switch-setting">
              Use Send
              <Switch checked={useSend} size="md" disabled={!useAlarm} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateView;

const Style = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        .container {
          display: flex;
          gap: 8px;
        }

        .title-input {
          background: transparent;
          border: 0;
          border-bottom: 2px solid ${theme.palette.primary.text};
          color: ${theme.palette.primary.text};
          padding: 0.4em;
          font-size: 18px;
          outline: 0;
        }

        .channel-viewer {
          display: flex;
          flex-direction: column;
          padding-top: 1em;
          padding-left: 0.5em;
        }

        .channel-description {
          background: #f5f5f5;
          padding: 1em 1.4em;
          flex: 1;
        }

        .channel-settings {
          padding: 1em;
          flex: 1;
        }

        .switch-setting {
          /* width: 15em; */
          display: flex;
          justify-content: space-between;
        }

        .area-tab-wapper {
          display: flex;
          align-items: center;
        }

        .area-description {
          height: 320px;
        }
      `}
    />
  );
};
