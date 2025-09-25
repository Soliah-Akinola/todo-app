import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Todo } from "../api/todos";
import { fetchTodo } from "../api/todos";

// Extend Todo type to include description (if your API returns it)
type TodoDetailType = Todo & {
  description?: string;
};

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: todo, isLoading, isError } = useQuery<TodoDetailType>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id as string),
  });

  if (isLoading) {
    return (
      <div className="text-center text-slate-500 mt-10">Loading task...</div>
    );
  }

  if (isError || !todo) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load task.
      </div>
    );
  }

  return (
    <section className="w-screen min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-16 px-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-3xl p-6 border border-slate-300">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:underline focus:outline-none"
        >
          ← Back to all tasks
        </button>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">📝 Task Details</h1>
        <p className="text-lg text-slate-700 mb-4">
          <span className="font-semibold">Title:</span> {todo.title}
        </p>
        <p className="text-lg text-slate-700 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {todo.description || "No description provided."}
        </p>
        <p className="text-lg text-slate-700">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={todo.completed ? "text-green-600" : "text-orange-500"}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default TodoDetail;
