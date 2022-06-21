import { css, Global } from '@emotion/react';
import { Body1, H5, H6, Header, Switch, Title1 } from '@wizrnd/nx-ui';
import { useState } from 'react';

import { Channel } from 'src/model/channel';
import AreaEditor from './AreaEditor';
import AreaSettingTab from './AreaSettingTab';

interface ChannelProps {
  channel: Channel;
}

const ChannelPage = ({ channel }: ChannelProps) => {
  const { id, name, description, url, area, alarm, judgement } = channel;
  const [selectedArea, setArea] = useState<number>(area.length);

  const handleChange = (selected: number) => {
    setArea(selected);
  };

  return (
    <main>
      <Header>
        <H6>채널 관리 / {name}</H6>
      </Header>

      <Style />
      <div className="container">
        <div className="channel-viewer">
          <AreaEditor area={area} selected={selectedArea} />
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
            Inference Check: <Switch checked={judgement} />
          </div>
          <div className="switch-setting">
            Alarm Call: <Switch checked={alarm} />
          </div>
          <div>
            <AreaSettingTab
              area={area}
              selected={selectedArea}
              handleChange={handleChange}
            />
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
    `}
  />
);
