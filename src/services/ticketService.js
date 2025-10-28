const KEY = "ticketapp_tickets";

export async function fetchTickets() {
  const raw = localStorage.getItem(KEY) || "[]";
  return JSON.parse(raw);
}

export async function createTicket(ticket) {
  
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const newTicket = { ...ticket, id: Date.now().toString(), createdAt: new Date().toISOString() };
  list.unshift(newTicket);
  localStorage.setItem(KEY, JSON.stringify(list));
  return newTicket;
}

export async function updateTicket(id, patch) {
  
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("NotFound");
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(list));
  return list[idx];
}

export async function deleteTicket(id) {
  
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const next = list.filter((t) => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return;
}
