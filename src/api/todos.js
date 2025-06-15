const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const fetchTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

let fakeTodos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Finish project', completed: true },
];

export const fetchTodos1 = async () => {
  return fakeTodos;
};

export const createTodo = async (newTodo) => {
  const id = Date.now();
  const todo = { id, ...newTodo };
  fakeTodos.push(todo);
  return todo;
};

export const updateTodo = async (id, updatedData) => {
  fakeTodos = fakeTodos.map(todo => todo.id === id ? { ...todo, ...updatedData } : todo);
  return fakeTodos.find(todo => todo.id === id);
};

export const deleteTodo = async (id) => {
  fakeTodos = fakeTodos.filter(todo => todo.id !== id);
  return id;
};

