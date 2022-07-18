import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { css, Global } from '@emotion/react';
import { Body1, Button, H5, Header, Switch, Title1 } from '@wizrnd/nx-ui';

import { AreaState, ChannelState } from '../type';

import AreaEditor from './AreaEditor';
import AreaTab from './AreaTab';
import AreaDetail from './AreaDetail';

interface ChannelProps {
  isNew: boolean;
  channel: ChannelState;
  area: AreaState;
  addArea: () => void;
  handleChangeArea: (key: number) => void;
  handleSubmit: () => void;
}

const UpdateView = ({
  isNew,
  channel,
  area,
  addArea,
  handleChangeArea,
  handleSubmit,
}: ChannelProps) => {
  const { t } = useTranslation();

  const submitBtnContent = useMemo(
    () => (isNew ? t('ADD') : t('UPDATE')),
    [t, isNew],
  );

  const {
    cameraSrc,
    channelArea,
    channelName,
    description,
    position,
    useAlarm,
    useChannel,
    useSend,
  } = channel.current;

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
          <AreaEditor area={area} list={channelArea} videoUrl={cameraSrc} />

          <div className="channel-description">
            <Title1>{channelName}</Title1>
            <Body1>{description}</Body1>
            <Body1>{cameraSrc}</Body1>
            <Body1>{position}</Body1>
          </div>
        </div>

        <div className="channel-settings">
          <H5 style={{ marginBottom: '1em' }}>Settings</H5>
          <div className="switch-setting">
            Use Channel:
            <Switch checked={useChannel} onClick={channel.toggleUseChannel} />
          </div>
          <div className="switch-setting">
            Use Alarm: <Switch checked={useAlarm} />
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
              Use Send: <Switch checked={useSend} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateView;

const Style = () => (
  <Global
    styles={css`
      .container {
        display: flex;
        gap: 8px;
      }

      .title-input {
        background: transparent;
        border: 0;
        border-bottom: 2px solid #fff;
        color: #fff;
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
        padding: 1em;
        flex: 1;
      }

      .channel-settings {
        padding: 1em;
        flex: 1;
      }

      .switch-setting {
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
