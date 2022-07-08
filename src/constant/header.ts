import { paths } from '../routes';

export const menu = [
  {
    path: paths.canvasSandbox,
    logo: 'HubotIcon',
    tooltip: '[Lab] - Canvas Sandbox',
  },
  {
    path: paths.alert,
    logo: 'MailIcon',
    tooltip: '[Lab] - Setting Alarm',
  },
  {
    path: paths.settings,
    logo: 'ToolsIcon',
    tooltip: 'Settings',
  },
];

export const title = {
  text: 'Inference',
  path: '/',
};

export const header_height = {
  wide: 40,
  narrow: 50,
};
