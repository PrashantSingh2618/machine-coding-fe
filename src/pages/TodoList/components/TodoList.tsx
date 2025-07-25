// TodoList.tsx
import React, { useState } from 'react';

import { useTodoContext } from '../todoContext';
import TodoItemComponent from './TodoItemComponent';

function TodoListMain() {
  const { todos, addTodo } = useTodoContext();
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Nested Todo List
      </h1>

      <form
        onSubmit={handleAddTodo}
        className="flex flex-col sm:flex-row gap-3 mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200"
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter a new todo..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-base"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-lg">No todos yet. Add your first todo above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItemComponent key={todo.id} todo={todo} level={0} />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoListMain;
