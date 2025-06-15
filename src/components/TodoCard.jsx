import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/todos';

export default function TodoCard({ todo, onEdit }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(todo.id);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{todo.title}</h2>
      <p className="text-slate-500 mb-4">{todo.completed ? '✅ Completed' : '⏳ Incomplete'}</p>
      
      <div className="flex gap-4">
        <Link
          to={`/todo/${todo.id}`}
          className="text-indigo-600 hover:underline"
        >
          View
        </Link>

        <button
          onClick={() => onEdit(todo)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
