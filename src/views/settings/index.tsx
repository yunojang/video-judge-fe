import MenuWrapper from 'src/components/Menu/MenuPage';
import { default_menu, menu } from './menu';

const Settings = () => {
  return (
    <main>
      <MenuWrapper menu={menu} defaultId={default_menu} />
    </main>
  );
};

export default Settings;
