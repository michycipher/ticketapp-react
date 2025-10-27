// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Dashboard = () => {
//   const { logout } = useAuth();
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
//     setTickets(storedTickets);
//   }, []);

//   const total = tickets.length;
//   const open = tickets.filter((t) => t.status === "open").length;
//   const resolved = tickets.filter((t) => t.status === "closed").length;

//   return (
//     <div className="max-w-[1440px] mx-auto p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-teal-700">Dashboard</h1>
//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6 my-8">
//         <div className="bg-green-100 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Total Tickets</h2>
//           <p className="text-2xl font-bold">{total}</p>
//         </div>
//         <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Open Tickets</h2>
//           <p className="text-2xl font-bold">{open}</p>
//         </div>
//         <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Resolved Tickets</h2>
//           <p className="text-2xl font-bold">{resolved}</p>
//         </div>
//       </div>

//       <Link
//         to="/tickets"
//         className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700"
//       >
//         Manage Tickets
//       </Link>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchTickets } from "../services/ticketService";
import { handleError } from "../utils/errorHandler";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchTickets();
        if (!mounted) return;
        setTickets(data);
      } catch (err) {
        handleError(err, "tickets");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-teal-700 mb-6">Dashboard</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-sm text-gray-600">Total tickets</h3>
                <p className="text-2xl font-bold">{total}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-sm text-gray-600">Open tickets</h3>
                <p className="text-2xl font-bold text-statusOpen">{open}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-sm text-gray-600">Resolved tickets</h3>
                <p className="text-2xl font-bold text-statusClosed">{closed}</p>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold mb-2">Quick actions</h2>
            <p className="text-sm text-gray-600">Use the Tickets page to create, edit or delete tickets.</p>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
