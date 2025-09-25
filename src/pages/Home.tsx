import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos, Todo } from "../api/todos";
import TodoCard from "../components/TodoCard";
import EditTodoModal from "../components/EditTodoModal";
// Note: You imported CreateTodoForm before, but didn’t use it. Keeping it here if needed.
// import CreateTodoForm from "../components/CreateTodoModal";

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
  const { data: todos = [], isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "not_completed"
  >("all");

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  // Update filtered list when todos or search changes
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(term)
    );
    setFilteredTodos(filtered);
    setPage(1);
  }, [todos, searchTerm]);

  // Pagination + filtering
  const start = (page - 1) * ITEMS_PER_PAGE;

  const filtered = todos.filter((todo) => {
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

        {/* Filters */}
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
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "completed" | "not_completed")
            }
            className="px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
        </div>

        {/* Todo Grid */}
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
            paginatedTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <TodoCard todo={todo} onEdit={() => setEditingTodo(todo)} />
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            ← Previous
          </button>
          <span className="text-slate-700 text-lg font-medium">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTodo && (
        <EditTodoModal todo={editingTodo} onClose={() => setEditingTodo(null)} />
      )}
    </section>
  );
};

export default Home;
