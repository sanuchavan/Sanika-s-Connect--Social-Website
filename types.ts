
export interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
}

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}
