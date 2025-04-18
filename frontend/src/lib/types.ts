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
