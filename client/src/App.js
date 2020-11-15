import './App.css';
import Form from './components/Form';
import React, { useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([]);

  return (
    <div className='App'>
      <header>ToDo List</header>
      <Form
        setInput={setInput}
        todos={todos}
        setTodos={setTodos}
        input={input}
        name={name}
        setName={setName}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
