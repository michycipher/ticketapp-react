// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { login } from "../utils/auth";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const user = storedUsers.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!user) {
//       toast.error("Invalid credentials");
//       return;
//     }

//     login(user);
//     toast.success("Login successful!");
//     navigate("/dashboard");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center pt-24 px-6">
//         <form
//           onSubmit={handleLogin}
//           className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 w-full mb-4 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 w-full mb-4 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-purple-600 w-full text-white py-2 rounded hover:bg-purple-700"
//           >
//             Login
//           </button>
//           <p className="text-center mt-4 text-sm">
//             Don't have an account?{" "}
//             <Link to="/auth/signup" className="text-purple-600">
//               Sign up
//             </Link>
//           </p>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Login


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const schema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      await login(data); // login throws on error and shows toast
    } catch (err) {
      // already handled in context with toast; keep here for additional logic if needed
      console.error("Login error", err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-Purple-700 mb-4 text-center">Welcome back</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-purple-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>

  );
}

