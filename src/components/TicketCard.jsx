
const statusColors = {
  open: "bg-green-200 text-green-800",
  in_progress: "bg-yellow-200 text-yellow-800",
  closed: "bg-gray-200 text-gray-800",
};

const TicketCard = ({ ticket, onEdit, onDelete }) => (
  <article className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold">{ticket.title}</h2>
    <p className="text-sm mb-2">{ticket.description || "No description provided."}</p>
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[ticket.status]}`}
    >
      {ticket.status}
    </span>
    
    <div className="flex justify-end gap-2 mt-4">
      <button
        onClick={onEdit}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </article>
);

export default TicketCard;
