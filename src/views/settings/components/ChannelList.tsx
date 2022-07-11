import { FC, ReactChild, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

import { Channel } from 'src/model/channel';
import { paths } from 'src/routes';
import { SettingMenu } from '../menu';

import { TextInput } from '@wizrnd/nx-ui';
import ListView from 'src/components/ListView';

const ChannelList: FC = () => {
  const { t } = useTranslation();
  const style = makeStyle();

  const columns = useMemo(
    () => [
      {
        Cell: ({ channelName }: Channel) => <span>{channelName}</span>,
        header: t('Name'),
        size: 20,
      },
      {
        Cell: ({ description }: Channel) => <span>{description}</span>,
        header: t('Description'),
        size: 25,
      },
      {
        Cell: ({ cameraSrc }: Channel) => <span>{cameraSrc}</span>,
        header: t('Camera URL'),
        size: 25,
      },
      {
        Cell: ({ useAlarm }: Channel) => (
          <span>{useAlarm ? t('ON') : t('OFF')}</span>
        ),
        header: t('Alarm'),
        size: 10,
      },
      {
        Cell: ({ createDate }: Channel) => <span>{createDate}</span>,
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

      <ListView<Channel>
        row={row}
        columns={columns}
        resource={SettingMenu.Channel}
      />
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
  `;

  return { container };
};
