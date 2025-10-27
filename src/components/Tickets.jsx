import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TicketCard from "../components/TicketCard";

const ticketSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "closed"], {
    message: "Invalid status value",
  }),
});

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ticketSchema) });

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  const saveTickets = (data) => {
    localStorage.setItem("tickets", JSON.stringify(data));
    setTickets(data);
  };

  const onSubmit = (data) => {
    if (editId) {
      const updated = tickets.map((t) => (t.id === editId ? { ...t, ...data } : t));
      saveTickets(updated);
      setEditId(null);
    } else {
      const newTicket = { id: Date.now(), ...data };
      saveTickets([...tickets, newTicket]);
    }
    reset();
  };

  const handleEdit = (ticket) => {
    reset(ticket);
    setEditId(ticket.id);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      const filtered = tickets.filter((t) => t.id !== id);
      saveTickets(filtered);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ticket Management</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl p-6 max-w-lg mb-6"
      >
        <h2 className="text-lg font-semibold mb-2">
          {editId ? "Edit Ticket" : "Create Ticket"}
        </h2>

        <input
          placeholder="Title"
          {...register("title")}
          className="border p-2 w-full rounded mb-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description")}
          className="border p-2 w-full rounded mb-2"
        ></textarea>

        <select
          {...register("status")}
          className="border p-2 w-full rounded mb-3"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700"
        >
          {editId ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
