// import { Link, useNavigate } from "react-router-dom";
// import { isAuthenticated, logout } from "../utils/auth";
// import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { session, logout } = useAuth();


  // const handleLogout = () => {
  //   logout();
  //   toast.success("Logged out successfully");
  //   navigate("/");
  // };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="font-extrabold text-3xl bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
          Tix
        </Link>
        <div className="space-x-4">
          {session ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600">
                Dashboard
              </Link>
              <Link to="/tickets" className="text-gray-700 hover:text-purple-600">
                Tickets
              </Link>
              <button
                onClick={logout}
                className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="font-semibold text-blue-600 hover:bg-blue-800 hover:rounded hover:text-white hover:px-3 hover:py-3 transition-all">
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="px-3 py-3 rounded font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow-lg hover:-translate-y-1 transition-transform"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar