const KEY = "ticketapp_tickets";

/** simulate latency and random failure */
function simulateNetwork() {
  return new Promise((resolve, reject) => {
    const latency = Math.random() * 300 + 200; // 200-500ms
    setTimeout(() => {
      // small chance to simulate network error (5%)
      if (Math.random() < 0.05) {
        reject(new Error("NetworkError"));
      } else {
        resolve();
      }
    }, latency);
  });
}

export async function fetchTickets() {
  await simulateNetwork();
  const raw = localStorage.getItem(KEY) || "[]";
  return JSON.parse(raw);
}

export async function createTicket(ticket) {
  await simulateNetwork();
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const newTicket = { ...ticket, id: Date.now().toString(), createdAt: new Date().toISOString() };
  list.unshift(newTicket);
  localStorage.setItem(KEY, JSON.stringify(list));
  return newTicket;
}

export async function updateTicket(id, patch) {
  await simulateNetwork();
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("NotFound");
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(list));
  return list[idx];
}

export async function deleteTicket(id) {
  await simulateNetwork();
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const next = list.filter((t) => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return;
}
