export interface PostData {
  title: string;
  author: string;
}

export interface Post extends PostData {
  id: number;
}
