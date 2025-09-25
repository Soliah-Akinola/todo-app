const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// Define Todo type
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string; // optional, since TodoDetail uses it
};

// Fetch all todos (from API)
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

// Fetch single todo (from API)
export const fetchTodo = async (id: number | string): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch todo with id ${id}`);
  return res.json();
};

// Fake local todos (for mock/demo)
let fakeTodos: Todo[] = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Finish project", completed: true },
];

// Mock fetch todos
export const fetchTodos1 = async (): Promise<Todo[]> => {
  return fakeTodos;
};

// Mock create todo
export const createTodo = async (
  newTodo: Omit<Todo, "id">
): Promise<Todo> => {
  const id = Date.now();
  const todo: Todo = { id, ...newTodo };
  fakeTodos.push(todo);
  return todo;
};

// Mock update todo
export const updateTodo = async (
  id: number,
  updatedData: Partial<Omit<Todo, "id">>
): Promise<Todo | undefined> => {
  fakeTodos = fakeTodos.map((todo) =>
    todo.id === id ? { ...todo, ...updatedData } : todo
  );
  return fakeTodos.find((todo) => todo.id === id);
};

// Mock delete todo
export const deleteTodo = async (id: number): Promise<number> => {
  fakeTodos = fakeTodos.filter((todo) => todo.id !== id);
  return id;
};
