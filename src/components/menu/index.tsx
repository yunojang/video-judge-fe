import { Menu as NxMenu, MenuItem } from '@wizrnd/nx-ui';

interface MenuProps {
  data: { menu: MenuObject[]; current: string | null };
  handleChange: (key: string) => void;
}

interface MenuObject {
  id: string;
  label: string;
}

const Menu: React.FC<MenuProps> = ({
  data: { menu, current },
  handleChange,
}) => {
  const renderMenu = ({ id, label }: MenuObject, index: number) => {
    const color = current === id ? '#e5efff' : 'white';

    return (
      <MenuItem key={index} menukey={id} style={{ background: color }}>
        {label}
      </MenuItem>
    );
  };

  return (
    <NxMenu onClick={info => handleChange(info.key)}>
      {menu.map((m, i) => renderMenu(m, i))}
    </NxMenu>
  );
};

export default Menu;
