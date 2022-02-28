import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { listTodos } from '../lib/todos';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {
      todos: await listTodos(),
    },
  };
}

export default function Todos(props) {
  const { todos } = props;
  const [text, setText] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(text),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      if (router) {
        router.replace(router.asPath);
      }
    });
  }

  return (
    <div className={styles.container}>
      <p>My Todo App</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {Object.keys(todos).map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
