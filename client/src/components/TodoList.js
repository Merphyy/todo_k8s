import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, setTodos }) => {
  return (
    <div>
      <div className='todo-container'>
        <ul className='todo-list'>
          {todos.map(todo => (
            <Todo todo={todo} todos={todos} key={todo.id} setTodos={setTodos} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
