import React from 'react';
import ExpenseDate from './Date'; 
import './List.css'; 

const TodoList = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p>Görev bulunamadı.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.createdAt || todo.text} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
         -
          <span className="todo-text" style={{ marginRight: '10px' }}>
            {todo.text}
          </span>
          <ExpenseDate date={todo.createdAt} /> 
          <button onClick={() => onToggle(todo.row_id)}>
           {todo.completed ? "Vazgeç" : "Tamamla"}
           </button>
          <button onClick={() => onDelete(todo.row_id)}>Sil</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;