import { default_menu, menu } from './menu';

import MenuPage from 'src/components/Menu/MenuPage';

const Settings = () => {
  return (
    <main>
      <MenuPage menu={menu} defaultId={default_menu} />
    </main>
  );
};

export default Settings;
