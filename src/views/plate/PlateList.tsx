import { ReactChild, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

import ListView from 'src/components/ListView';
import { paths } from 'src/routes';
import { Channel } from 'src/model/channel';
import { Button } from '@wizrnd/nx-ui';

const PlateList = () => {
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
        Cell: ({ useChannel }: Channel) => (
          <div className="item-cell">{useChannel ? t('ON') : t('OFF')}</div>
        ),
        header: t('USE'),
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
        <Link key={id} to={`${paths.plate}/${id}`}>
          <div className="list-item">{children}</div>
        </Link>
      ),
    }),
    [],
  );

  return (
    <div className={style.container}>
      <Link to={`${paths.plate}/new`}>
        <Button iconName="PlusIcon">New</Button>
      </Link>
      <ListView<Channel>
        resource="channel"
        row={row}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
};

export default PlateList;

const makeStyle = () => {
  const container = css`
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
