import { useState, useEffect } from "react";
// Define the Todo type here if not exported from "../api/todos"
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
// import { Todo } from "../api/todos";

// Props type
type TodoFormProps = {
  onSubmit: (todo: Omit<Todo, "id">) => void;
  initialData?: Partial<Omit<Todo, "id">>; // optional, may include title/completed
  onClose: () => void;
};

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialData = {},
  onClose,
}) => {
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (initialData.title) setTitle(initialData.title);
    if (typeof initialData.completed === "boolean")
      setCompleted(initialData.completed);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, completed });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <span>Completed</span>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
