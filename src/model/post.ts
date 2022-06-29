export interface PostPublic {
  title: string;
  author: string;
}

export interface Post extends PostPublic {
  id: number;
}
