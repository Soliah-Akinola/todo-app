export default function DeleteConfirm({ onConfirm, onCancel }) {
    return (
      <div className="p-4">
        <p className="mb-4">Are you sure you want to delete this task?</p>
        <div className="flex gap-4">
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    );
}
  