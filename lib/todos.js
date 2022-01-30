import fs from 'fs';

export function addTodo(text) {
  const todos = listTodos();
  todos.push(text);
  console.log(`todos = ${todos}`);
  fs.writeFileSync('todos.json', JSON.stringify(todos));
};

export function listTodos() {
  let todos = [];
  try {
    todos = JSON.parse(fs.readFileSync('todos.json'));
  } catch (err) {
    console.warn(`no todos file found - returning an empty list`);
  }
  return todos;
};
