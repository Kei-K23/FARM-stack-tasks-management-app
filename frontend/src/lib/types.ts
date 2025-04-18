export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
}

export interface TaskStatus {
  _id: string;
  title: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ErrorResponse {
  success: boolean;
  error: {
    code: number;
    message: string;
  };
}

export interface Token {
  access_token: string;
  user: User;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  task_list_id: string;
  due_date: Date;
  priority: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface TaskList {
  _id: string;
  title: string;
  description: string;
  plan_id: string;
  created_at: Date;
  updated_at: Date;
  tasks: ITask[];
}

export interface Plan {
  _id: string;
  title: string;
  description: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  task_lists: TaskList[];
}
