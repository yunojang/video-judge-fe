export interface UserPublic {
  name: string;
}

export interface User extends UserPublic {
  id: number;
}
