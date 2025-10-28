// import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TicketCard from "../components/TicketCard";

const Dashboard = () => {
  // const { logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
      setLoading(false);

  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <>
      <Navbar />

      <main className="pt-14">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <h1 className="pb-5 font-extrabold text-2xl">Dashboard</h1>
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
                <p className="text-2xl font-bold text-statusClosed">
                  {resolved}
                </p>
              </div>
            </div>
          )}

          <Link
            to="/tickets"
            className=" text-white bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-3 rounded block w-fit mb-6"
          >
            Create Ticket
          </Link>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;






// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { fetchTickets } from "../services/ticketService";
// import { handleError } from "../utils/errorHandler";
// import { Link } from "react-router-dom";
// import TicketCard from "../components/TicketCard";

// export default function Dashboard() {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         const data = await fetchTickets();
//         if (!mounted) return;
//         setTickets(data);
//       } catch (err) {
//         handleError(err, "tickets");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => (mounted = false);
//   }, []);

//   const total = tickets.length;
//   const open = tickets.filter((t) => t.status === "open").length;
//   const closed = tickets.filter((t) => t.status === "closed").length;

//   return (
//     <>
//       <Navbar />
//       <main className="pt-14">
//         <div className="max-w-[1440px] mx-auto px-6 py-8">
//           <h1 className="pb-5 font-extrabold text-2xl">
//             Dashboard
//           </h1>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6 mb-6">
//               <div className="bg-white p-6 rounded-2xl shadow">
//                 <h3 className="text-sm text-gray-600">Total tickets</h3>
//                 <p className="text-2xl font-bold">{total}</p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow">
//                 <h3 className="text-sm text-gray-600">Open tickets</h3>
//                 <p className="text-2xl font-bold text-statusOpen">{open}</p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow">
//                 <h3 className="text-sm text-gray-600">Resolved tickets</h3>
//                 <p className="text-2xl font-bold text-statusClosed">{closed}</p>
//               </div>
//             </div>
//           )}

//           <Link
//             to="/tickets"
//             className=" text-white bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-3 rounded block w-fit mb-6"
//           >
//             Create Ticket
//           </Link>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tickets.map((ticket) => (
//               <TicketCard key={ticket.id} ticket={ticket} />
//             ))}
//           </div>

//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
