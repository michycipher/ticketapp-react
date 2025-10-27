import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { handleError } from "../utils/errorHandler";
// import { isAuthenticated, loginSession, logoutSession, TOKEN_KEY } from "../utils/auth";


// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));
//     const session = localStorage.getItem("ticketapp_session");
//     if (storedUser && session) {
//       setUser(storedUser);
//     }
//   }, []);

//   const signup = (data) => {
//     const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
//     const userExists = users.some((u) => u.email === data.email);
//     if (userExists) throw new Error("User already exists.");

//     users.push(data);
//     localStorage.setItem("ticketapp_users", JSON.stringify(users));
//     alert("Signup successful! You can now log in.");
//     navigate("/login");
//   };

//   const login = ({ email, password }) => {
//     const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
//     const foundUser = users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (!foundUser) throw new Error("Invalid credentials");

//     localStorage.setItem("ticketapp_user", JSON.stringify(foundUser));
//     localStorage.setItem("ticketapp_session", "true");
//     setUser(foundUser);
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("ticketapp_user");
//     localStorage.removeItem("ticketapp_session");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null); // object: { email, name } or null
  // const isLoggingOut = useRef(false); // prevent multiple triggers


  useEffect(() => {
    try {
      const raw = localStorage.getItem("ticketapp_session");
      if (raw) {
        setSession(JSON.parse(raw));
      }
    } catch {
      // if parsing fails, clear
      localStorage.removeItem("ticketapp_session");
      setSession(null);
    }
  }, []);

  // Auto-check session expiry every minute
  // useEffect(() => {
  //   const checkSession = () => {
  //     if (!isAuthenticated()) {
  //       toast.error("Your session has expired — please log in again.");
  //       logoutSession();
  //       setSession(null);
  //       navigate("/auth/login");
  //     } else {
  //       const current = localStorage.getItem(TOKEN_KEY);
  //       if (current) setSession(JSON.parse(current));
  //     }
  //   };

  //   checkSession();
  //   const interval = setInterval(checkSession, 60 * 1000); // check every minute
  //   return () => clearInterval(interval);
  // }, [navigate]);

  // const signup = ({ name, email, password }) => {
  //   const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  //   if (users.find((u) => u.email === email)) {
  //     // user exists
  //     toast.error("User already exists!");
  //     throw new Error("User exists");
  //   }
  //   const newUser = { name, email, password };
  //   users.push(newUser);
  //   localStorage.setItem("ticketapp_users", JSON.stringify(users));
  //   toast.success("Account created successfully!");
  //   navigate("/auth/login");
  // };

  const signup = async ({ name, email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
      if (users.some((u) => u.email === email)) {
        toast.error("A user with that email already exists.");
        throw new Error("UserExists");
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("ticketapp_users", JSON.stringify(users));
      toast.success("Account created. Please log in.");
      navigate("/auth/login");
    } catch (err) {
      handleError(err, "auth");
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) {
        toast.error("Invalid credentials");
        throw new Error("InvalidCredentials");
      }

      const sessionObj = { email: found.email, name: found.name || found.email, issuedAt: Date.now() };
      localStorage.setItem("ticketapp_session", JSON.stringify(sessionObj));
      setSession(sessionObj);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      handleError(err, "auth");
      throw err;
    }
  };

// const login = async ({ email, password }) => {
//   try {
//     const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
//     const found = users.find((u) => u.email === email && u.password === password);
//     if (!found) {
//       toast.error("Invalid credentials");
//       throw new Error("InvalidCredentials");
//     }

//     const newSession = loginSession(found);
//     setSession(newSession);

//     toast.success("Login successful!");
//     navigate("/dashboard");
//   } catch (err) {
//     handleError(err, "auth");
//     throw err;
//   }
// };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setSession(null);
    toast.info("Logged out");
    navigate("/auth/login");
  };
  // const logout = () => {
  //   if (isLoggingOut.current) return; // ignore if already triggered
  //   isLoggingOut.current = true;

  //   logoutSession();
  //   setSession(null);
  //   toast.info("Logged out");
  //   navigate("/auth/login");


  //   setTimeout(() => {
  //     isLoggingOut.current = false;
  //   }, 1000);
  // };

  return (
    <AuthContext.Provider value={{ session, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

