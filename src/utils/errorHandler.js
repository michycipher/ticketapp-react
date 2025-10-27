import toast from "react-hot-toast";

export function handleError(error, context = "general") {
  // If provided a string, normalize
  const code = error && error.message ? error.message : String(error);

  if (context === "auth") {
    if (code === "SessionExpired") {
      toast.error("Your session has expired — please log in again.");
      return;
    }
    if (code === "InvalidCredentials") {
      toast.error("Invalid email or password.");
      return;
    }
    if (code === "UserExists") {
      toast.error("A user with that email already exists.");
      return;
    }
    toast.error("Authentication failed. Please try again.");
    return;
  }

  if (context === "tickets") {
    if (code === "NetworkError") {
      toast.error("Failed to load tickets. Please retry.");
      return;
    }
    if (code === "ValidationError") {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    toast.error("An error occurred while processing tickets. Please retry.");
    return;
  }

  // fallback
  toast.error("Something went wrong. Please try again.");
}
