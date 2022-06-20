import { css } from '@emotion/css';
import { Button, Header as NxHeader } from '@wizrnd/nx-ui';
import { Link } from 'react-router-dom';

interface TitleProps {
  path?: string;
  icon?: string;
  alt?: string;
  width?: string | number;
  tootip?: string;
  text?: string;
}

interface MenuObject {
  path: string;
  text?: string;
  logo?: string;
  tooltip?: string;
}

interface HeaderProps {
  menu: MenuObject[];
  title?: TitleProps;
  isFrontendRouter?: (path: string) => boolean;
}

// const settingMenus = ['alarm', 'setting'];

const Title = ({ icon, path, text, alt, width }: TitleProps) => {
  return (
    <div style={{ width, cursor: 'pointer' }}>
      {icon && (
        <a href={path}>
          <img src={icon} alt={alt} />
        </a>
      )}
      {text && <a href={path}>{text}</a>}
    </div>
  );
};

const Header = ({
  title,
  menu,
  isFrontendRouter = () => false,
}: HeaderProps) => {
  const renderMenu = ({
    path,
    text,
    logo,
    index,
  }: MenuObject & { index: number }) => {
    const isFrontend = isFrontendRouter(path);
    const Item = logo ? <Button iconName={logo}>{text}</Button> : text;

    return isFrontend ? (
      <Link to={path} key={index}>
        {Item}
      </Link>
    ) : (
      <a href={path} key={index}>
        {Item}
      </a>
    );
  };

  return (
    <NxHeader className={style} shadow={0}>
      <Title {...title} />
      <div className="menu-right">
        {menu.map((item, index) => renderMenu({ ...item, index }))}
      </div>
    </NxHeader>
  );
};

export default Header;

const style = css`
  background-color: white;
  color: black;
`;
