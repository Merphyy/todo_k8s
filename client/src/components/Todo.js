import React from 'react';

const Todo = ({ todos, todo, setTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter(el => el.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      todos.map(el => {
        if (el.id === todo.id) {
          return {
            ...el,
            completed: !el.completed,
          };
        }
        return el;
      })
    );
  };
  
  return (
    <div className='todo'>
      {todo.completed ? <i className='fa fa-check'></i> : ''}
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        {todo.name}: {todo.text}
      </li>
      <button className='complete-btn' onClick={completeHandler}>
        {' '}
        <i className='fas fa-check'></i>
      </button>
      <button onClick={deleteHandler} className='trash-btn'>
        <i className='fas fa-trash'></i>
      </button>
    </div>
  );
};

export default Todo;
