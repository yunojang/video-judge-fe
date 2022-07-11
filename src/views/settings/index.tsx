import { default_menu, settingMenus } from './menu';

import MenuPage from 'src/components/Menu/MenuPage';

const Settings = () => {
  return (
    <main>
      <MenuPage menu={settingMenus} defaultId={default_menu} />
    </main>
  );
};

export default Settings;
