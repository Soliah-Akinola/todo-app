import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";

// Define the Todo type (expand if your API has more fields)
type Todo = {
  id: number | string;
  title: string;
  completed: boolean;
};

// Props type
type EditTodoModalProps = {
  todo: Todo;
  onClose: () => void;
};

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData: Omit<Todo, "id">) =>
      updateTodo(todo.id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ title, completed });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Edit Todo</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Todo title"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Completed
        </label>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodoModal;
