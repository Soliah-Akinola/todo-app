"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteConfirm from "./DeleteConfirm";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
};

export default function TodoCard({ todo, onEdit }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{todo.title}</h2>
      <p className="text-slate-500 mb-4">
        {todo.completed ? "✅ Completed" : "⏳ Incomplete"}
      </p>

      <div className="flex gap-4">
        <Link href={`/todo/${todo.id}`} className="text-indigo-600 hover:underline">
          View
        </Link>

        <button onClick={() => onEdit(todo)} className="text-blue-600 hover:underline">
          Edit
        </button>

        <button onClick={() => setShowDelete(true)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>

      {/* DeleteConfirm always rendered */}
      <DeleteConfirm
        id={todo.id}
        onClose={() => setShowDelete(false)}
        isOpen={showDelete}
      />
    </div>
  );
}
