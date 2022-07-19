import { ReactChild, useMemo, useState } from 'react';
import { Layout } from '@wizrnd/nx-ui';

import { getPath, isFrontendRoute } from 'src/routes';

import ErrorMsg from '../ErrorMsg';
import Menu from '../Menu';
import Header, { MenuObject as HeaderMenuObject } from '../Header';
import { invalidError } from './constant';
import { makeNewMenu } from './utils';

interface MenuObject {
  id: string;
  label: string;
  element: ReactChild;
  addonMenu?: string[];
}

interface MenuWrapperProps {
  menu: MenuObject[];
  defaultId: string;
  sideWidth?: string;
}

const MenuWrapper = ({
  menu,
  defaultId,
  sideWidth = '220px',
}: MenuWrapperProps) => {
  const [selected, setSelected] = useState<string>(defaultId);

  const selectedMenu = useMemo(
    () => menu.find(v => v.id === selected),
    [selected, menu],
  );

  // menu page header's menu
  const headerMenu = useMemo(() => {
    const menus: HeaderMenuObject[] = [];
    if (!selectedMenu) {
      return menus;
    }

    const { id, label, addonMenu } = selectedMenu;
    if (!addonMenu) {
      return menus;
    }

    const path = getPath(id);
    if (!path) {
      return menus;
    }

    if (addonMenu.includes('add')) {
      const menu = makeNewMenu(label, path);
      menus.push(menu);
    }

    return menus;
  }, [selectedMenu]);

  const headerTitle = useMemo(() => {
    if (!selectedMenu) {
      return '';
    }

    return `${selectedMenu.label} Setting`;
  }, [selectedMenu]);

  return (
    <Layout.Container>
      <Header
        title={{ text: headerTitle }}
        menu={headerMenu}
        isFrontendRouter={isFrontendRoute}
        height={45}
      />

      <Layout.Container style={{ flexDirection: 'row' }}>
        <Layout.Sider width={sideWidth}>
          <Menu
            menu={menu}
            current={selected}
            handleChange={k => setSelected(k)}
          />
        </Layout.Sider>

        <Layout.Content style={{ padding: '0.5em' }}>
          {selectedMenu?.element ?? <ErrorMsg error={invalidError} />}
        </Layout.Content>
      </Layout.Container>
    </Layout.Container>
  );
};

export default MenuWrapper;
