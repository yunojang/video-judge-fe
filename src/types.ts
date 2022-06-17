import { Post } from 'src/model/post';
import { User } from 'src/model/user';

export enum MenuType {
  User = 'users',
  Post = 'posts',
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
];

export type ListType = User | Post;
