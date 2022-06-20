import { useMemo, useState } from 'react';
import { temp_menu, default_menu, MenuType } from '../../types';

import { Layout } from '@wizrnd/nx-ui';
import Menu from 'src/components/Menu';
import ErrorMsg from 'src/components/ErrorMsg';
import UserList from './components/UserList';
import PostList from './components/PostList';

const Settings = () => {
  const [menu, setMenu] = useState<string>(default_menu);

  const Component = useMemo(() => {
    if (menu === MenuType.User) {
      return <UserList />;
    } else if (menu === MenuType.Post) {
      return <PostList />;
    } else if (menu === MenuType.Channel) {
      return <PostList />;
    } else {
      return <ErrorMsg msg="Incorrect menu" />;
    }
  }, [menu]);

  return (
    <main>
      <Layout.Container style={{ flexDirection: 'row' }}>
        <Layout.Sider width="200px">
          <Menu
            data={{ menu: temp_menu, current: menu }}
            handleChange={k => setMenu(k)}
          />
        </Layout.Sider>
        <Layout.Content style={{ padding: '0.5em' }}>
          {Component}
        </Layout.Content>
      </Layout.Container>
    </main>
  );
};

export default Settings;
