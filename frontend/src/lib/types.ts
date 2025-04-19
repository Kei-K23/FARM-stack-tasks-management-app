export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
}

export interface TaskStatus {
  id: string;
  title: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Token {
  access_token: string;
  user: User;
}
