// TodoItemComponent.tsx
import React, { useState } from 'react';

import { useTodoContext } from '../todoContext';
import { TodoItem } from '../types';

interface TodoItemProps {
  todo: TodoItem;
  level: number;
}

function TodoItemComponent({ todo, level }: TodoItemProps) {
  const { toggleComplete, toggleExpanded, addTodo } = useTodoContext();
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtaskText.trim()) {
      addTodo(newSubtaskText.trim(), todo.id);
      setNewSubtaskText('');
      setShowAddForm(false);
    }
  };

  return (
    <div
      style={{ marginLeft: `${level * 20}px` }}
      className={`${level > 0 ? 'border-l-2 border-gray-200 pl-3' : ''}`}
    >
      <div className="mb-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />

          <span
            className={`flex-1 text-base ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.text}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              title="Add subtask"
            >
              +
            </button>

            {todo.children.length > 0 && (
              <button
                type="button"
                onClick={() => toggleExpanded(todo.id)}
                className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                title={todo.expanded ? 'Collapse' : 'Expand'}
              >
                {todo.expanded ? '−' : '+'}
              </button>
            )}
          </div>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddSubtask}
            className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                placeholder="Enter subtask..."
                className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-base"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {todo.expanded && todo.children.length > 0 && (
          <div className="mt-4">
            {todo.children.map((child) => (
              <TodoItemComponent
                key={child.id}
                todo={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItemComponent;
