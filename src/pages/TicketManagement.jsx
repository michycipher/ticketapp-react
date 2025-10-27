
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "../validation/ticketSchema";
import { toast } from "react-hot-toast";

import TicketCard from "../components/TicketCard";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ticketSchema),
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(stored);
  }, []);

  const onSubmit = (data) => {
    let updatedTickets;
    if (editId) {
      updatedTickets = tickets.map((t) =>
        t.id === editId ? { ...t, ...data } : t
      );
      toast.success("Ticket updated successfully!");
    } else {
      const newTicket = { id: Date.now(), ...data };
      updatedTickets = [...tickets, newTicket];
      toast.success("Ticket created successfully!");
    }
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setEditId(null);
    reset();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      localStorage.setItem("tickets", JSON.stringify(updated));
      toast.info("Ticket deleted.");
    }
  };

  const handleEdit = (ticket) => {
    reset(ticket);
    setEditId(ticket.id);
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-teal-700">Ticket Management</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <input
          {...register("title")}
          placeholder="Ticket Title"
          className="w-full border p-2 rounded mb-2"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
        />

        <select
          {...register("status")}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          {editId ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onEdit={() => handleEdit(ticket)}
            onDelete={() => handleDelete(ticket.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketManagement;

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import TicketCard from "../components/TicketCard";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { fetchTickets, createTicket, updateTicket, deleteTicket } from "../services/ticketService";
// import { handleError } from "../utils/errorHandler";
// import toast from "react-hot-toast";

// const schema = z.object({
//   title: z.string().min(1, "Title is required").max(140),
//   description: z.string().max(500).optional(),
//   status: z.enum(["open", "in_progress", "closed"])
// });

// export default function TicketManager() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [edit, setEdit] = useState(null);

//   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: { title: "", description: "", status: "open" }
//   });

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         const list = await fetchTickets();
//         if (!mounted) return;
//         setTickets(list);
//       } catch (err) {
//         handleError(err, "tickets");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => (mounted = false);
//   }, []);

//   const refreshLocal = (newList) => {
//     setTickets(newList);
//   };

//   const onSubmit = async (data) => {
//     try {
//       if (edit) {
//         await updateTicket(edit.id, data);
//         const updated = await fetchTickets();
//         refreshLocal(updated);
//         toast.success("Ticket updated successfully");
//       } else {
//         await createTicket(data);
//         const updated = await fetchTickets();
//         refreshLocal(updated);
//         toast.success("Ticket created successfully");
//       }
//       setEdit(null);
//       reset();
//     } catch (err) {
//       handleError(err, "tickets");
//     }
//   };

//   const handleEdit = (ticket) => {
//     setEdit(ticket);
//     reset({ title: ticket.title, description: ticket.description, status: ticket.status });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this ticket?");
//     if (!confirmed) return;
//     try {
//       await deleteTicket(id);
//       const updated = await fetchTickets();
//       refreshLocal(updated);
//       toast.success("Ticket deleted");
//     } catch (err) {
//       handleError(err, "tickets");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="pt-24">
//         <div className="max-w-[1440px] mx-auto px-6 py-8">
//           <h1 className="text-3xl font-bold text-teal-700 mb-6">Ticket Management</h1>

//           <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow mb-8 max-w-xl">
//             <h2 className="text-xl font-semibold mb-2">{edit ? "Edit Ticket" : "Create Ticket"}</h2>

//             <label className="block text-sm mb-1">Title</label>
//             <input {...register("title")} className="w-full border rounded px-3 py-2 mb-1" aria-invalid={!!errors.title} />
//             {errors.title && <p className="text-red-600 text-sm mb-2">{errors.title.message}</p>}

//             <label className="block text-sm mb-1">Description (optional)</label>
//             <textarea {...register("description")} className="w-full border rounded px-3 py-2 mb-1" rows="3" />
//             {errors.description && <p className="text-red-600 text-sm mb-2">{errors.description.message}</p>}

//             <label className="block text-sm mb-1">Status</label>
//             <select {...register("status")} className="w-full border rounded px-3 py-2 mb-3" aria-invalid={!!errors.status}>
//               <option value="open">open</option>
//               <option value="in_progress">in_progress</option>
//               <option value="closed">closed</option>
//             </select>
//             {errors.status && <p className="text-red-600 text-sm mb-2">{errors.status.message}</p>}

//             <div className="flex gap-3">
//               <button type="submit" disabled={isSubmitting} className="bg-teal-600 text-white px-4 py-2 rounded">
//                 {isSubmitting ? "Saving..." : edit ? "Update Ticket" : "Create Ticket"}
//               </button>
//               {edit && <button type="button" onClick={() => { setEdit(null); reset(); }} className="px-4 py-2 rounded border">Cancel</button>}
//             </div>
//           </form>

//           {loading ? <p>Loading tickets...</p> : (
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {tickets.length === 0 && <p className="text-gray-600">No tickets yet. Create one above.</p>}
//               {tickets.map((t) => <TicketCard key={t.id} ticket={t} onEdit={handleEdit} onDelete={handleDelete} />)}
//             </div>
//           )}
//         </div>
//       </main>
//     </>
//   );
// }
