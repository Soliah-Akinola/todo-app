"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TodoCard from "@/components/TodoCard";
import EditTodoModal from "@/components/EditTodoModal";
import CreateTodoModal from "@/components/CreateTodoModal";

const ITEMS_PER_PAGE = 10;

const fetchTodos = async () => {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export default function Home() {
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);

  const start = (page - 1) * ITEMS_PER_PAGE;

  const filtered = todos.filter((todo: any) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && todo.completed) ||
      (statusFilter === "not_completed" && !todo.completed);
    return matchesSearch && matchesStatus;
  });

  const paginatedTodos = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <section className="min-h-screen bg-gradient-to-tr from-slate-50 to-slate-100 py-16 px-6">
      <div className="w-full px-6">
        <header className="mb-14 text-center">
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            📋 Task Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Stay productive and organized with your personal todo list
          </p>
        </header>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full max-w-xs"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
          >
            ➕ Add New Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center text-slate-500">
              Loading tasks...
            </div>
          ) : paginatedTodos.length === 0 ? (
            <div className="col-span-full text-center text-slate-500">
              No tasks found
            </div>
          ) : (
            paginatedTodos.map((todo: any) => (
              <div
                key={todo.id}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <TodoCard todo={todo} onEdit={() => setEditingTodo(todo)} />
              </div>
            ))
          )}
        </div>

        <div className="mt-16 flex justify-center items-center gap-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            ← Previous
          </button>
          <span className="text-slate-700 text-lg font-medium">
            Page {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Next →
          </button>
        </div>
      </div>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
        />
      )}
      {showCreate && <CreateTodoModal onClose={() => setShowCreate(false)} />}
    </section>
  );
}
