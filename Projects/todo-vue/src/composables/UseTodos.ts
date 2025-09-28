import { ref } from 'vue';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);

  // Fetch all todos
  const fetchTodos = async () => {
    loading.value = true;
    try {
      const res = await fetch('/api/todos');
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      todos.value = data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Create a new todo
  const createTodo = async (title: string, completed = false) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed }),
      });
      if (!res.ok) throw new Error('Failed to create todo');
      const newTodo = await res.json();
      todos.value.push(newTodo);
    } catch (err) {
      console.error(err);
    }
  };

  // Update an existing todo
  const updateTodo = async (id: number, title: string, completed: boolean) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, completed }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updatedTodo = await res.json();
      const index = todos.value.findIndex(todo => todo.id === id);
      if (index !== -1) todos.value[index] = updatedTodo;
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      todos.value = todos.value.filter(todo => todo.id !== id);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    todos,
    loading,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
