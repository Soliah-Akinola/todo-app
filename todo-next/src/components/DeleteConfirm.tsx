"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  id: number;
  onClose: () => void;
  isOpen: boolean; // control visibility
};

export default function DeleteConfirm({ id, onClose, isOpen }: Props) {
  const queryClient = useQueryClient();

  // Always call hooks – do not put inside if(isOpen)
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/todos`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onClose();
    },
  });

  // Conditional render based on isOpen
  if (!isOpen) return null;

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-red-600">🛑 Delete Task</h2>
        <p className="mb-6 text-slate-700">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
