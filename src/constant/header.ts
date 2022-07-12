import { paths } from '../routes';

export const menu = [
  {
    path: '/',
    logo: 'HubotIcon',
    tooltip: '= Labortory =',
  },
  {
    path: paths.alert,
    logo: 'MailIcon',
    tooltip: 'Setting Alarm',
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
