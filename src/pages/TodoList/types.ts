export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  expanded: boolean;
  children: TodoItem[];
  parentId?: string;
}

export interface TodoContextType {
  todos: TodoItem[];
  addTodo: (text: string, parentId?: string) => void;
  toggleComplete: (id: string) => void;
  toggleExpanded: (id: string) => void;
  updateTodo: (id: string, updates: Partial<TodoItem>) => void;
}
