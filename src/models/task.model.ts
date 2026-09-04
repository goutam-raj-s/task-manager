export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const tasks: Task[] = [];
