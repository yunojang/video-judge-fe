import { useMemo, useState, useEffect } from 'react';
import { css, Global } from '@emotion/react';
import { Body1, Button, H5, H6, Header, Switch, Title1 } from '@wizrnd/nx-ui';

import {
  AreaObject,
  Channel,
  ChannelObject,
  Position,
} from 'src/model/channel';
import { all_index } from '../type';

import AreaEditor from './AreaEditor';
import AreaTab from './AreaTab';
import AreaDetail from './AreaDetail';
import { useTranslation } from 'react-i18next';

interface ChannelProps {
  isNew: boolean;
  channel?: Channel;
  onSubmit?: (channel: ChannelObject) => void;
}

const UpadtePage = ({
  isNew,
  channel: defaultChannel,
  onSubmit = () => {},
}: ChannelProps) => {
  const { t } = useTranslation();

  const [channel, setChannel] = useState<ChannelObject>(new ChannelObject({}));

  useEffect(() => {
    if (isNew) {
      setChannel(new ChannelObject({}));
    } else {
      setChannel(defaultChannel as ChannelObject);
    }
  }, [isNew, defaultChannel]);

  const {
    area,
    cameraSrc,
    channelName,
    description,
    position,
    useAlarm,
    useInference,
    useSend,
  } = channel;

  const updateChannel = (newChannel: Partial<ChannelObject>) => {
    setChannel({ ...channel, ...newChannel });
  };

  const [selectedArea, setSelectedArea] = useState<number>(all_index);
  const currentArea = useMemo(
    () => (selectedArea !== all_index ? area[selectedArea] : null),
    [area, selectedArea],
  );

  const handleChangeSelected = (selected: number) => {
    setSelectedArea(selected);
  };

  const pushArea = () => {
    updateChannel({ area: [...area, new AreaObject({})] });
    setSelectedArea(area.length);
  };

  const updateArea = (areaObject: AreaObject) => {
    const area = [...channel.area];
    area[selectedArea] = areaObject;

    updateChannel({ area });
  };

  const deleteArea = () => {
    if (currentArea) {
      const area = [...channel.area];
      area.splice(selectedArea, 1);

      updateChannel({ area });
      setSelectedArea(selectedArea ? selectedArea - 1 : all_index);
    }
  };

  const clearArea = () => {
    if (currentArea) {
      updateArea({ ...currentArea, position: [] });
    }
  };

  const changeColor = (color: string) => {
    if (currentArea) {
      updateArea({ ...currentArea, color });
    }
  };

  const pushPosition = (pos: Position) => {
    if (currentArea) {
      const position = [...currentArea.position, pos];
      updateArea({ ...currentArea, position });
    }
  };

  const handleSubmit = () => {
    if (channel !== defaultChannel) {
      onSubmit(channel);
    }
  };

  const submitBtnContent = useMemo(
    () => (isNew ? t('ADD') : t('UPDATE')),
    [t, isNew],
  );

  return (
    <main>
      <Header>
        <H6>채널 관리 / </H6>
        <Button variant="contained" color="#103950" onClick={handleSubmit}>
          {submitBtnContent}
        </Button>
      </Header>

      <Style />
      <div className="container">
        <div className="channel-viewer">
          <AreaEditor
            areas={area}
            selected={selectedArea}
            onPushPosition={pushPosition}
            onClearArea={clearArea}
          />

          <div className="channel-description">
            <Title1>{channelName}</Title1>
            <Body1>{description}</Body1>
            <Body1>{cameraSrc}</Body1>
          </div>
        </div>

        <div className="channel-settings">
          <H5>Settings</H5>
          <div className="switch-setting">
            Use Inference: <Switch checked={useInference} />
          </div>
          <div className="switch-setting">
            Use Alarm: <Switch checked={useAlarm} />
          </div>
          <div className="switch-setting">
            Use Send: <Switch checked={useSend} />
          </div>

          <div>
            <div className="area-tab-wapper">
              <AreaTab
                areas={area}
                selected={selectedArea}
                handleChange={handleChangeSelected}
              />
              <Button onClick={pushArea} iconName="PlusIcon" size="md" />
            </div>

            <div className="area-description">
              {currentArea && (
                <AreaDetail
                  handleChangeColor={changeColor}
                  area={currentArea}
                  handleDelete={deleteArea}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpadtePage;

const Style = () => (
  <Global
    styles={css`
      .container {
        display: flex;
        gap: 8px;
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
        height: 360px;
      }
    `}
  />
);
