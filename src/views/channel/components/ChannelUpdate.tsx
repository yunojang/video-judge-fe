import { css, Global } from '@emotion/react';
import { Body1, Button, H5, H6, Header, Switch, Title1 } from '@wizrnd/nx-ui';
import { useMemo, useState } from 'react';

import { all_index } from '../type';
import { AreaObject, Channel, Position } from 'src/model/channel';

import AreaEditor from './AreaEditor';
import AreaTab from './AreaTab';
import AreaDetail from './AreaDetail';
import Seal from 'src/components/Seal';

interface ChannelProps {
  channel: Channel;
  areaLoading: boolean;
  shapeLoading: boolean;
  pushArea: (area?: AreaObject) => Promise<number>;
  deleteArea: (index: number) => void;
  setArea: (area: AreaObject, index: number) => void;
  pushPosition: (position: Position, index: number) => void;
}

const ChannelUpdate = ({
  channel,
  areaLoading,
  shapeLoading,
  pushArea,
  deleteArea,
  setArea,
  pushPosition,
}: ChannelProps) => {
  const {
    id,
    channelName,
    description,
    cameraSrc,
    useInference,
    useAlarm,
    useSend,
    area,
  } = channel;

  const [selectedArea, setSelectedArea] = useState<number>(all_index); // no arae setting
  const currentArea = useMemo(
    () => (selectedArea !== all_index ? area[selectedArea] : null),
    [area, selectedArea],
  );

  const handleChange = (selected: number) => {
    setSelectedArea(selected);
  };

  const handlePushArea = async () => {
    const index = await pushArea();

    if (index > -1) {
      handleChange(index);
    }
  };

  const handlePushPosition = (position: Position) => {
    pushPosition(position, selectedArea);
  };

  const handleDeleteArea = () => {
    if (selectedArea === all_index) {
      return;
    }

    deleteArea(selectedArea);
    setSelectedArea(selectedArea ? selectedArea - 1 : all_index);
  };

  const handleChangeColor = (color: string) => {
    if (!currentArea) {
      return;
    }

    setArea({ ...currentArea, color }, selectedArea);
  };

  const handleClearArea = () => {
    if (!currentArea) {
      return;
    }

    setArea({ ...currentArea, position: [] }, selectedArea);
  };

  return (
    <main>
      <Header>
        <H6>채널 관리 / {channelName}</H6>
      </Header>

      <Style />
      <div className="container">
        <div className="channel-viewer">
          {/* area editor */}
          <AreaEditor
            areas={area}
            selected={selectedArea}
            shapeLoading={shapeLoading}
            onPushPosition={handlePushPosition}
            onClearArea={handleClearArea}
          />

          <div className="channel-description">
            <Title1>
              [{id}] {channelName}
            </Title1>
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
            <Seal sealing={areaLoading} transparence>
              <>
                <div className="area-tab-wapper">
                  <AreaTab
                    parentId={id}
                    areas={area}
                    selected={selectedArea}
                    handleChange={handleChange}
                  />
                  <Button
                    onClick={handlePushArea}
                    iconName="PlusIcon"
                    size="md"
                  />
                </div>

                <div className="area-description">
                  {currentArea && (
                    <AreaDetail
                      handleChangeColor={handleChangeColor}
                      area={currentArea}
                      handleDelete={handleDeleteArea}
                    />
                  )}
                </div>
              </>
            </Seal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChannelUpdate;

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
