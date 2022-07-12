import { FC, ReactChild, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

import { Channel } from 'src/model/channel';
import { paths } from 'src/routes';

import { TextInput } from '@wizrnd/nx-ui';
import ListView from 'src/components/ListView';

const ChannelList: FC = () => {
  const { t } = useTranslation();
  const style = makeStyle();

  const columns = useMemo(
    () => [
      {
        Cell: ({ channelName }: Channel) => (
          <div className="item-cell">{channelName}</div>
        ),
        header: t('Name'),
        size: 20,
      },
      {
        Cell: ({ description }: Channel) => (
          <div className="item-cell">{description}</div>
        ),
        header: t('Description'),
        size: 25,
      },
      {
        Cell: ({ cameraSrc }: Channel) => (
          <div className="item-cell">{cameraSrc}</div>
        ),
        header: t('Camera URL'),
        size: 25,
      },
      {
        Cell: ({ useAlarm }: Channel) => (
          <div className="item-cell">{useAlarm ? t('ON') : t('OFF')}</div>
        ),
        header: t('Alarm'),
        size: 10,
      },
      {
        Cell: ({ createDate }: Channel) => (
          <div className="item-cell">{createDate}</div>
        ),
        header: t('Create Date'),
        size: 20,
      },
    ],
    [t],
  );

  const row = useMemo(
    () => ({
      Container: (children: ReactChild, { id }: Channel) => (
        <Link key={id} to={`${paths.channels}/${id}`}>
          <div className="list-item">{children}</div>
        </Link>
      ),
    }),
    [],
  );

  return (
    <div className={style.container}>
      <div className="channel-input">
        <TextInput placeholder="Search Channel" iconName="SearchIcon" />
      </div>

      <ListView<Channel> row={row} columns={columns} resource="video-stream" />
    </div>
  );
};

export default ChannelList;

const makeStyle = () => {
  const container = css`
    .channel-input {
      margin-bottom: 10px;
    }

    .list-item {
      padding: 0.4em 0;
    }
    .list-item:hover {
      background-color: #f5f5f5;
    }

    .item-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  return { container };
};
