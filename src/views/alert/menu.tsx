import AlertList from './components/AlertList';

export enum MenuType {
  Alert = 'alerts',
  Send = 'sends',
}

export const default_menu = MenuType.Alert;

export const menu = [
  {
    id: MenuType.Alert,
    label: 'Alert',
    element: <AlertList />,
  },
  {
    id: MenuType.Send,
    label: 'Send',
    element: <div>send</div>,
  },
];
