import { css } from '@emotion/css';
import { ChannelObject } from 'src/model/channel';

import VideoPlayer from 'src/components/VideoPlayer';
import { Button } from '@wizrnd/nx-ui';

interface ItemProps {
  item: ChannelObject;
}
const DashboardItem = ({ item }: ItemProps) => {
  return (
    <div className={style}>
      <div className="info">
        <span>{item.channelName}</span>
        <Button iconName="ScreenFullIcon" />
      </div>
      <div className="frame">
        <VideoPlayer multipart height="100%" url={item.cameraSrc} />
      </div>
    </div>
  );
};

export default DashboardItem;

const style = css`
  height: 100%;
  display: flex;
  flex-direction: column;

  & > .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  & > .frame {
    flex: 1;
    text-align: center;
    background-color: #f5f5f5;
  }
`;
