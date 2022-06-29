import { useMemo, useState } from 'react';
import { menu, default_menu, MenuType } from './types';

import { Layout } from '@wizrnd/nx-ui';
import Menu from 'src/components/Menu';
import ErrorMsg from 'src/components/ErrorMsg';
import ChannelList from './components/ChannelList';

const Settings = () => {
  const [selected, setSelected] = useState<string>(default_menu);

  const Component = useMemo(() => {
    if (selected === MenuType.Channel) {
      return <ChannelList />;
    } else {
      return <ErrorMsg msg="Incorrect menu" />;
    }
  }, [selected]);

  return (
    <main>
      <Layout.Container style={{ flexDirection: 'row' }}>
        <Layout.Sider width="200px">
          <Menu
            data={{ menu, current: selected }}
            handleChange={k => setSelected(k)}
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
