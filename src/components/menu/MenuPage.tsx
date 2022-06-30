import { ReactChild, useMemo, useState } from 'react';

import { Layout } from '@wizrnd/nx-ui';
import Menu from 'src/components/Menu';
import ErrorMsg from 'src/components/ErrorMsg';

interface MenuObject {
  id: string;
  label: string;
  element: ReactChild;
}

interface MenuWrapperProps {
  menu: MenuObject[];
  defaultId: string;
  sideWidth?: string;
}

const MenuWrapper = ({
  menu,
  defaultId,
  sideWidth = '200px',
}: MenuWrapperProps) => {
  const [selected, setSelected] = useState<string>(defaultId);

  const Component = useMemo(() => {
    const comp = menu.find(v => v.id === selected)?.element;

    return comp ?? <ErrorMsg msg="Invalid menu" />;
  }, [selected, menu]);

  return (
    <Layout.Container style={{ flexDirection: 'row' }}>
      <Layout.Sider width={sideWidth}>
        <Menu
          menu={menu}
          current={selected}
          handleChange={k => setSelected(k)}
        />
      </Layout.Sider>

      <Layout.Content style={{ padding: '0.5em' }}>{Component}</Layout.Content>
    </Layout.Container>
  );
};

export default MenuWrapper;
