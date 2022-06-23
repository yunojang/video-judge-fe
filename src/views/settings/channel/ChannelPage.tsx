import { css, Global } from '@emotion/react';
import { Body1, Button, H5, H6, Header, Switch, Title1 } from '@wizrnd/nx-ui';
import { useState } from 'react';

import { all_index } from './type';
import { Channel } from 'src/model/channel';
import AreaEditor from './AreaEditor';
import AreaTab from './components/AreaTab';
import { Area, Shape } from 'src/canvas/CanvasClass';

interface ChannelProps {
  channel: Channel;
  pushArea: (area?: Area) => void;
  pushShape: (shape: Shape, index: number) => void;
}

const ChannelPage = ({ channel, pushArea, pushShape }: ChannelProps) => {
  const { id, name, description, url, alarm, inference, area } = channel;

  const [selectedArea, setArea] = useState<number>(all_index); // All tab
  const [areaLoading, setAreaLoading] = useState<boolean>(false);

  const handleChange = (selected: number) => {
    setArea(selected);
  };

  const handlePushArea = () => {
    pushArea();
  };

  const handlePushShape = (shape: Shape) => {
    pushShape(shape, selectedArea);
  };

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
          />

          <div className="channel-description">
            <Title1>
              [{id}] {name}
            </Title1>
            <Body1>{description}</Body1>
            <Body1>{url}</Body1>
          </div>
        </div>

        <div className="channel-settings">
          <H5>Settings</H5>

          <div className="switch-setting">
            Inference Check: <Switch checked={inference} />
          </div>
          <div className="switch-setting">
            Alarm Call: <Switch checked={alarm} />
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
