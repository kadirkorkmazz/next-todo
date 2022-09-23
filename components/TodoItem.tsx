import React, { useState } from 'react';
import Todo from './Todo';

type TodoItemProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TodoItem(props: TodoItemProps) {
  const { todo, todos, setTodos } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.content);

  const handleComplete = () => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = () => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      const updatedTodos = todos.map((item) => {
        if (item.id === todo.id) {
          item.content = editingText;
        }
        return item;
      });
      setTodos(updatedTodos);
    }

    setEditingText(todo.content);
  };

  return (
    <>
      <li className="flex items-center justify-between w-full  hover:bg-slate-100">
        <input
          id={`checkbox${todo.id}`}
          className="w-6 h-6 mr-2 ml-2"
          type="checkbox"
          checked={todo.isCompleted ? true : false}
          onChange={handleComplete}
        ></input>

        {isEditing ? (
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 overflow-scroll"
            type="text"
            value={editingText}
            onChange={(e) => {
              e.preventDefault();
              setEditingText(e.target.value);
            }}
          />
        ) : (
          <label
            htmlFor={`checkbox${todo.id}`}
            className={`w-full overflow-scroll ${
              todo.isCompleted ? 'line-through opacity-50' : ''
            }`}
          >
            {todo.content}
          </label>
        )}
        <div className="w-25 flex">
          <button
            onClick={handleEdit}
            className="text-red-500 hover:text-red-700 font-bold py-1 px-2  m-1 "
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-bold py-1 px-2  m-1 "
          >
            Sil
          </button>
        </div>
      </li>
    </>
  );
}

export default TodoItem;
