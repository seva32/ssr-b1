import React, { useState } from 'react';

import Head from '../../components/Head';

import { api } from '../../utils/api';
import { useServerData } from '../../state/serverDataContext';
import { Button, Container } from './Home.style';

const Home = () => {
  const serverTodos = useServerData(data => data.todos || []);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(serverTodos);

  return (
    <div>
      <Head title="Home Page" />
      <h1>Home page</h1>

      <form
        onSubmit={e => {
          e.preventDefault();

          const newTodo = {
            text
          };

          api.todos.create(newTodo).then(res => {
            setTodos([...todos, res]);
            setText('');
          });
        }}
      >
        <label htmlFor="todo">Add a todo</label>
        <br />
        <input
          id="todo"
          type="text"
          value={text}
          autoComplete="off"
          onChange={e => setText(e.target.value)}
        />
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <Container>
        <Button type="button">Send</Button>
      </Container>
    </div>
  );
};

Home.fetchData = () =>
  api.todos.all().then(todos => ({
    todos
  }));

export default Home;
