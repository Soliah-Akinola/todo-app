import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";

// Define props type
type CreateTodoModalProps = {
  onClose: () => void;
};

// Define Todo type (adjust if your API has more fields)
type Todo = {
  title: string;
  completed: boolean;
};

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>(""); // state type

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: Todo) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ title, completed: false });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Add New Todo</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Todo title"
          required
        />
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
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodoModal;
