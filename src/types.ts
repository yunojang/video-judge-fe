import { Post } from 'src/model/post';
import { User } from 'src/model/user';
import { AlertPublic } from './model/alert';

export enum MenuType {
  User = 'users',
  Post = 'posts',
  Channel = 'channels',
}

export const default_menu = MenuType.User;

export const temp_menu = [
  {
    id: MenuType.User,
    label: 'User',
  },
  {
    id: MenuType.Post,
    label: 'Post',
  },
  {
    id: MenuType.Channel,
    label: 'Channel',
  },
];

export type ListType = User | Post | AlertPublic;
