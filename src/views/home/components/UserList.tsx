import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ListView from 'src/components/ListView';
import ErrorMsg from 'src/components/ErrorMsg';
import { User } from 'src/model/user';
import { List } from '@wizrnd/nx-ui';

const UserList: FC = () => {
  const { t } = useTranslation();

  const render = (collection: User[] | null) => {
    if (!collection) {
      return <ErrorMsg msg={t('No Data, Check Resource key')} />;
    }

    return <List data={collection.map(c => `[${c.id}] ${c.name}`)} />;
  };

  return <ListView<User> renderList={render} resource="users" />;
};

export default UserList;
