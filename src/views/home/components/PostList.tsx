import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';

import ListView from 'src/components/ListView';
import ErrorMsg from 'src/components/ErrorMsg';
import PostForm from './PostForm';
import { MenuType } from 'src/types';
import { useList } from '../../hooks';
import { RootState } from 'src/store';
import { Post } from 'src/model/post';

const PostList: FC = () => {
  const resource = MenuType.Post;

  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.user);
  const { postList } = useList(resource);

  const addPosting = (title: string) => {
    const body = {
      title,
      author: user.name,
    };

    postList(body);
  };

  const style = makeStyle();

  const renderList = (collection: Post[] | null) => {
    if (!collection) {
      return <ErrorMsg msg={t('No Data, Check Resource key')} />;
    }

    return (
      <div>
        {collection.map((item, i) => (
          <div key={i} className={style.container}>
            <div>
              {item.id}. {item.title}
            </div>
            <span className={style.author}>{item.author}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <PostForm onSubmit={addPosting} />
      <ListView<Post> resource={resource} renderList={renderList} />
    </>
  );
};

export default PostList;

const makeStyle = () => {
  const container = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6em;
    margin-bottom: 0.2em;
    background-color: #f5f5f5;
  `;

  const author = css`
    font-size: 12px;
    color: #777;
  `;

  return { container, author };
};
