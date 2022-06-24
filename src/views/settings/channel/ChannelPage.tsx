import { css, Global } from '@emotion/react';
import { Body1, Button, H5, H6, Header, Switch, Title1 } from '@wizrnd/nx-ui';
import { useMemo, useState } from 'react';

import { all_index } from './type';
import { Channel } from 'src/model/channel';
import AreaEditor from './AreaEditor';
import AreaTab from './components/AreaTab';
import { Area, Shape } from 'src/canvas/CanvasClass';

interface ChannelProps {
  channel: Channel;
  areaLoading: boolean;
  shapeLoading: boolean;
  pushArea: (area?: Area) => Promise<number>;
  pushShape: (shape: Shape, index: number) => void;
}

const ChannelPage = ({
  channel,
  pushArea,
  pushShape,
  areaLoading,
  shapeLoading,
}: ChannelProps) => {
  const {
    id,
    name,
    description,
    cameraSrc,
    useInference,
    useAlarm,
    useSend,
    area,
  } = channel;

  const [selectedArea, setArea] = useState<number>(all_index); // no arae setting

  const handleChange = (selected: number) => {
    setArea(selected);
  };

  const handlePushArea = async () => {
    const index = await pushArea();

    if (index > -1) {
      handleChange(index);
    }
  };

  const handlePushShape = (shape: Shape) => {
    pushShape(shape, selectedArea);
  };

  const currentArea = useMemo(() => area[selectedArea], [area, selectedArea]);
  console.log(currentArea);

  return (
    <main>
      <Header>
        <H6>채널 관리 / {name}</H6>
      </Header>

      <Style />
      <div className="container">
        <div className="channel-viewer">
          {/* area editor */}
          <AreaEditor
            areas={area}
            selected={selectedArea}
            pushShape={handlePushShape}
            shapeLoading={shapeLoading}
          />

          <div className="channel-description">
            <Title1>
              [{id}] {name}
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

          <div className="area-tab-wapper">
            <AreaTab
              parentId={id}
              area={area}
              selected={selectedArea}
              handleChange={handleChange}
            />
            {!areaLoading && (
              <Button onClick={handlePushArea} iconName="PlusIcon" size="md" />
            )}
          </div>

          <div className="area-description">
            {/* <div>{currentArea.color}</div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChannelPage;

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
    `}
  />
);
