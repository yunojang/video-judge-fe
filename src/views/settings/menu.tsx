import ChannelList from '../channel/ChannelList';

export enum SettingMenu {
  Channel = 'channels',
  Model = 'models',
}

export const default_menu = SettingMenu.Channel;

export const settingMenus = [
  {
    id: SettingMenu.Channel,
    label: 'Channel',
    element: <ChannelList />,
    addonMenu: ['add'],
  },
  {
    id: SettingMenu.Model,
    label: 'Model',
    element: <div>[GET] api/algorithm-model</div>,
  },
];
