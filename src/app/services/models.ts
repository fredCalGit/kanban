export interface Board {
  id?: string;
  name: string;
  columns?: { name: string }[];
  tasks?: Task[]
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  subtasks: SubTask[] | null;
  status: string;
  column: string
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
