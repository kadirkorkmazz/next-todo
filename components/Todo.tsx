import React, { useState } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  content: string;
  isCompleted: boolean;
}

const todoData = [
  { content: 'Learn Next.js', isCompleted: false, id: 1 },
  { content: 'Learn TypeScript', isCompleted: false, id: 2 },
  { content: 'Learn Tailwind CSS', isCompleted: false, id: 3 },
];

function Todo() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todoData);

  const handleAdd = () => {
    if (inputText) {
      const newTodo = {
        content: inputText,
        isCompleted: false,
        id: todos.length + 1,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <form
        className="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 bg-white rounded-md shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          type="text"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={(e) => {
            e.preventDefault();
            setInputText(e.target.value);
          }}
        />
      </form>

      <ul className="max-w-md w-full mt-2 mb-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
