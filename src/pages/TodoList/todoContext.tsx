// TodoContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { TodoItem, TodoContextType } from './types';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
};
type Props = {
  children: React.ReactNode;
};

function TodoProvider({ children }: Props) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const findTodoById = useCallback(
    (todosItem: TodoItem[], id: string): TodoItem | null => {
      // eslint-disable-next-line no-restricted-syntax
      for (const todo of todosItem) {
        if (todo.id === id) return todo;
        const found = findTodoById(todo.children, id);
        if (found) return found;
      }
      return null;
    },
    []
  );

  const updateTodoInTree = useCallback(
    (
      todoItem: TodoItem[],
      id: string,
      updates: Partial<TodoItem>
    ): TodoItem[] => {
      return todoItem.map((todo) => {
        if (todo.id === id) {
          return { ...todo, ...updates };
        }
        return {
          ...todo,
          children: updateTodoInTree(todo.children, id, updates),
        };
      });
    },
    []
  );

  const addTodoToTree = useCallback(
    (
      todoItem: TodoItem[],
      newTodo: TodoItem,
      parentId?: string
    ): TodoItem[] => {
      if (!parentId) {
        return [...todoItem, newTodo];
      }

      return todoItem.map((todo) => {
        if (todo.id === parentId) {
          return {
            ...todo,
            children: [...todo.children, newTodo],
            expanded: true, // Auto-expand when adding subtask
          };
        }
        return {
          ...todo,
          children: addTodoToTree(todo.children, newTodo, parentId),
        };
      });
    },
    []
  );

  const checkAllChildrenCompleted = useCallback(
    (_children: TodoItem[]): boolean => {
      if (_children.length === 0) return false;
      return _children.every((child) => child.completed);
    },
    []
  );
  const updateAllNestedChildren = useCallback(
    (_children: TodoItem[], completed: boolean): TodoItem[] => {
      return _children.map((child) => ({
        ...child,
        completed,
        _children: updateAllNestedChildren(child.children, completed),
      }));
    },
    []
  );

  const updateChildrenCompletion = useCallback(
    (_todos: TodoItem[], parentId: string, completed: boolean): TodoItem[] => {
      return _todos.map((todo) => {
        if (todo.id === parentId) {
          const updatedChildren = todo.children.map((child) => ({
            ...child,
            completed,
            children: updateAllNestedChildren(child.children, completed),
          }));
          return { ...todo, children: updatedChildren };
        }
        return {
          ...todo,
          children: updateChildrenCompletion(
            todo.children,
            parentId,
            completed
          ),
        };
      });
    },
    []
  );

  const updateParentCompletion = useCallback(
    (_todos: TodoItem[], childId: string): TodoItem[] => {
      return _todos.map((todo) => {
        const updatedChildren = updateParentCompletion(todo.children, childId);
        const childExists = todo.children.some((child) => child.id === childId);

        if (childExists) {
          const allChildrenCompleted =
            checkAllChildrenCompleted(updatedChildren);
          return {
            ...todo,
            completed: allChildrenCompleted,
            children: updatedChildren,
          };
        }

        return { ...todo, children: updatedChildren };
      });
    },
    [checkAllChildrenCompleted]
  );

  const collapseAllNestedChildren = useCallback(
    (_children: TodoItem[]): TodoItem[] => {
      return _children.map((child) => ({
        ...child,
        expanded: false,
        children: collapseAllNestedChildren(child.children),
      }));
    },
    []
  );

  const collapseAllChildren = useCallback(
    (_todos: TodoItem[], parentId: string): TodoItem[] => {
      return _todos.map((todo) => {
        if (todo.id === parentId) {
          return {
            ...todo,
            children: todo.children.map((child) => ({
              ...child,
              expanded: false,
              children: collapseAllNestedChildren(child.children),
            })),
          };
        }
        return {
          ...todo,
          children: collapseAllChildren(todo.children, parentId),
        };
      });
    },
    []
  );

  const addTodo = useCallback(
    (text: string, parentId?: string) => {
      const newTodo: TodoItem = {
        id: generateId(),
        text,
        completed: false,
        expanded: false,
        children: [],
        parentId,
      };

      setTodos((prev) => addTodoToTree(prev, newTodo, parentId));
    },
    [addTodoToTree]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setTodos((prev) => {
        const todo = findTodoById(prev, id);
        if (!todo) return prev;

        const newCompleted = !todo.completed;
        let updated = updateTodoInTree(prev, id, { completed: newCompleted });

        // If marking as completed, mark all children as completed
        if (newCompleted) {
          updated = updateChildrenCompletion(updated, id, true);
        }

        // Update parent completion status
        updated = updateParentCompletion(updated, id);

        return updated;
      });
    },
    [
      findTodoById,
      updateTodoInTree,
      updateChildrenCompletion,
      updateParentCompletion,
    ]
  );

  const toggleExpanded = useCallback(
    (id: string) => {
      setTodos((prev) => {
        const todo = findTodoById(prev, id);
        if (!todo) return prev;

        const newExpanded = !todo.expanded;
        let updated = updateTodoInTree(prev, id, { expanded: newExpanded });

        // If collapsing, collapse all children
        if (!newExpanded) {
          updated = collapseAllChildren(updated, id);
        }

        return updated;
      });
    },
    [findTodoById, updateTodoInTree, collapseAllChildren]
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<TodoItem>) => {
      setTodos((prev) => updateTodoInTree(prev, id, updates));
    },
    [updateTodoInTree]
  );

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: TodoContextType = {
    todos,
    addTodo,
    toggleComplete,
    toggleExpanded,
    updateTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default TodoProvider;
