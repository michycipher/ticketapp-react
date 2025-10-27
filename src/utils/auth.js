// export const TOKEN_KEY = "ticketapp_session";
// const SESSION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

// export const isAuthenticated = () => {
//   try {
//     const raw = localStorage.getItem(TOKEN_KEY);
//     if (!raw) return false;

//     const session = JSON.parse(raw);
//     const now = Date.now();

//     // Check if expired
//     if (now - session.issuedAt > SESSION_EXPIRY_MS) {
//       localStorage.removeItem(TOKEN_KEY);
//       return false;
//     }

//     return true;
//   } catch (err) {
//     console.error("Error validating session:", err);
//     return false;
//   }
// };

// export const login = (user) => {
//   localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
// };

// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };


export const TOKEN_KEY = "ticketapp_session";
const SESSION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

export const isAuthenticated = () => {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return false;

    const session = JSON.parse(raw);
    const now = Date.now();

    // Check if expired
    if (now - session.issuedAt > SESSION_EXPIRY_MS) {
      localStorage.removeItem(TOKEN_KEY);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error validating session:", err);
    localStorage.removeItem(TOKEN_KEY);
    return false;
  }
};

export const loginSession = (user) => {
  const session = {
    email: user.email,
    name: user.name || user.email,
    issuedAt: Date.now(),
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
  return session;
};

export const logoutSession = () => {
  localStorage.removeItem(TOKEN_KEY);
};
