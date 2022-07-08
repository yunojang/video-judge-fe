import { css } from '@emotion/css';
import { Button, Header as NxHeader, Tooltip } from '@wizrnd/nx-ui';
import { Link } from 'react-router-dom';

interface TitleProps {
  path?: string;
  icon?: string;
  alt?: string;
  width?: string | number;
  tootip?: string;
  text?: string;
}

export interface MenuObject {
  path: string;
  text?: string;
  logo?: string;
  tooltip?: string;
}

interface HeaderProps {
  menu?: MenuObject[];
  title?: TitleProps;
  height?: number;
  color?: string;
  shadow?: number;
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
  menu = [],
  height,
  color = 'white',
  shadow = 0,
  isFrontendRouter = () => false,
}: HeaderProps) => {
  const renderMenu = ({
    path,
    text,
    logo,
    index,
  }: MenuObject & { index?: number }) => {
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
    <NxHeader
      className={style}
      shadow={shadow}
      minHeight={height}
      color={color}
    >
      <Title {...title} />
      <div className="menu-right">
        {menu.map((item, index) =>
          item.tooltip ? (
            <Tooltip title={item.tooltip} key={index} arrow>
              {renderMenu({ ...item })}
            </Tooltip>
          ) : (
            renderMenu({ ...item, index })
          ),
        )}
      </div>
    </NxHeader>
  );
};

export default Header;

const style = css`
  color: black;
`;
