import { defineStore } from "pinia";
import axios from "axios";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    async fetchTodos() {
      const res = await axios.get("/api/todos");
      this.todos = res.data;
    },
    async createTodo(title: string) {
      const res = await axios.post("/api/todos", { title, completed: false });
      this.todos.push(res.data);
    },
    async updateTodo(todo: Todo) {
      const res = await axios.put("/api/todos", todo);
      const index = this.todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) this.todos[index] = res.data;
    },
    async deleteTodo(id: number) {
      await axios.delete(`/api/todos/${id}`);
      this.todos = this.todos.filter((t) => t.id !== id);
    },
  },
});
