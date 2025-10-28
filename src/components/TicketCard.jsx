
export default function TicketCard({ ticket, onEdit, onDelete }) {
  const { title, description, status, createdAt } = ticket;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown date";

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold mb-1">{title}</h3>

        <span
          className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            status === "open"
              ? "bg-green-100 text-green-700"
              : status === "in_progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status.replace("_", " ")}
        </span>
      </div>

      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-500 mb-1">Created: {formattedDate}</p>

      {onEdit && onDelete && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
