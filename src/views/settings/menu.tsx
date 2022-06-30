import ChannelList from './components/ChannelList';

export enum MenuType {
  Channel = 'channels',
  Model = 'models',
}

export const default_menu = MenuType.Channel;

export const menu = [
  {
    id: MenuType.Channel,
    label: 'Channel',
    element: <ChannelList />,
  },
  {
    id: MenuType.Model,
    label: 'Model',
    element: <div>[GET] api/algorithm-model</div>,
  },
];
