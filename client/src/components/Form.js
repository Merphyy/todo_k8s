import React, { useEffect } from 'react';
import axios from 'axios';

const Form = ({ name, setName, setInput, setTodos, todos, input }) => {
  useEffect(() => {
    sendTodo();
  }, [todos]);

  const inputHandler = e => {
    setInput(e.target.value);
  };
  const nameHandler = e => {
    setName(e.target.value);
  };
  const submitTodoHandler = e => {
    e.preventDefault();
    setTodos([
      ...todos,
      { name: name, text: input, completed: false, id: Math.random() * 10000 },
    ]);

    // setInput('');
    // setName('');
  };

  const sendTodo = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name: name, task: input, completed: false });
    setInput('');
    setName('');
    const res = await axios.post('http://localhost:5000/todo', body, config);
    console.log(res.data);
  };

  const clickHandle = e => {
    submitTodoHandler(e);
    sendTodo();
  };
  return (
    <div>
      <form>
        <input
          type='text'
          className='name-input'
          onChange={nameHandler}
          placeholder='name'
          value={name}
        />
        <input
          type='text'
          className='todo-input'
          onChange={inputHandler}
          placeholder='Task'
          value={input}
        />
        <button
          className='todo-button'
          type='submit'
          // onClick={e => clickHandle(e)}
          onClick={submitTodoHandler}
        >
          <i className='fas fa-plus-square'></i>
        </button>
      </form>
    </div>
  );
};

export default Form;
