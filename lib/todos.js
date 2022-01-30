import fs from 'fs';
const TODOS_FILE = '/tmp/todos.json';

export function addTodo(text) {
  const todos = listTodos();
  todos.push(text);
  console.log(`todos = ${todos}`);
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos));
};

export function listTodos() {
  let todos = [];
  try {
    todos = JSON.parse(fs.readFileSync(TODOS_FILE));
  } catch (err) {
    console.warn(`no todos file found - returning an empty list`);
  }
  return todos;
};
