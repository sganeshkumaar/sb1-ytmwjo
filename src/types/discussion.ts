export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
  attachments?: Attachment[];
}

export interface Discussion {
  id: string;
  title: string;
  author: User;
  content: string;
  createdAt: string;
  comments: Comment[];
  status: 'open' | 'resolved';
  tags: string[];
  attachments?: Attachment[];
}