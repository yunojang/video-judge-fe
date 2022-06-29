import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

import { Channel } from 'src/model/channel';

import ListView from 'src/components/ListView';
import ErrorMsg from 'src/components/ErrorMsg';

const resource = 'channels';
const ChannelList: FC = () => {
  const { t } = useTranslation();
  const style = makeStyle();

  const renderChannel = ({
    id,
    name,
    description,
    index,
    useAlarm,
  }: Channel & { index: number }) => (
    <Link to={`/channel/${id}`} key={index}>
      <div className={style.container}>
        <span className="title">{name}</span>
        <div className="description">
          <span>{description}</span>
          <span>{useAlarm ? 'on' : 'off'}</span>
        </div>
      </div>
    </Link>
  );

  const render = (collection: Channel[] | null) => {
    if (!collection) {
      return <ErrorMsg msg={t('No Data, Check Resource key')} />;
    }

    return (
      <div>{collection.map((c, index) => renderChannel({ ...c, index }))}</div>
    );
  };

  return <ListView<Channel> renderList={render} resource={resource} />;
};

export default ChannelList;

const makeStyle = () => {
  const container = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6em;
    margin-bottom: 0.2em;
    background-color: #f5f5f5;
    cursor: pointer;
    text-decoration: none;

    .title {
      color: #222;
      font-size: 16px;
    }

    .description {
      color: #888;
      font-size: 13px;
    }
    .description > span {
      padding: 1em;
    }
  `;

  return { container };
};
