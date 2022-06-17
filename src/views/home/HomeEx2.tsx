import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from 'src/store';
import { loadUser } from 'src/reducer/user';
import { temp_menu, default_menu, MenuType } from '../../types';

import { Header, Layout } from '@wizrnd/nx-ui';
import Loading from 'src/components/Loading';
import Menu from 'src/components/Menu';
import ErrorMsg from 'src/components/ErrorMsg';
import UserList from './components/UserList';
import PostList from './components/PostList';

interface PrepareProps extends StateProps, DispatchProps {}

const Home = (props: PrepareProps) => {
  const { t } = useTranslation();
  const { user, loadUser } = props;

  useEffect(() => {
    loadUser(1);
  }, []);

  const [menu, setMenu] = useState<string>(default_menu);

  const ListComp = useMemo(() => {
    if (menu === MenuType.User) {
      return <UserList />;
    } else if (menu === MenuType.Post) {
      return <PostList />;
    } else {
      return <ErrorMsg msg="Incorrect menu" />;
    }
  }, [menu]);

  return (
    <div>
      <Header shadow={0}>
        <span>NX-BP</span>
        {user.loading ? (
          <Loading position="inline" size={8} color="white" />
        ) : user.flag ? (
          <span>
            {t('Hello')} {user.user.name}
          </span>
        ) : (
          <ErrorMsg msg="Faild load to user" />
        )}
      </Header>

      <main>
        <Layout.Container style={{ flexDirection: 'row' }}>
          <Layout.Sider width="200px">
            <Menu
              data={{ menu: temp_menu, current: menu }}
              handleChange={k => setMenu(k)}
            />
          </Layout.Sider>
          <Layout.Content style={{ padding: '0.5em' }}>
            {ListComp}
          </Layout.Content>
        </Layout.Container>
      </main>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = {
  loadUser,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
