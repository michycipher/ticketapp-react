// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     if (users.find((u) => u.email === email)) {
//       toast.error("User already exists!");
//       return;
//     }
//     users.push({ email, password });
//     localStorage.setItem("users", JSON.stringify(users));
//     toast.success("Account created successfully!");
//     navigate("/auth/login");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center pt-24 px-6">
//         <form
//           onSubmit={handleSignup}
//           className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
//             Sign Up
//           </button>
//           <p className="text-center mt-4 text-sm">
//             Already have an account?{" "}
//             <Link to="/auth/login" className="text-blue-600">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Signup

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const schema = z
  .object({
    name: z.string().min(2, { message: "Enter your name" }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      await signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      // signup() navigates and toasts via context
    } catch (err) {
      // already handled with toast in context; console for debugging
      console.error("Signup error", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-purple -700 mb-4 text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                {...register("name")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none"
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-purple-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
