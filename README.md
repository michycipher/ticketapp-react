# Ticketing App – Vite + React + Local Storage

This is a React-based ticket management system built with **React**, **Local storage**, and **Tailwind CSS**. It allows users to create, update, delete, and view support tickets using localStorage for persistence. The project is a server-rendered React-based app, designed for simplicity, speed, and full control, no external APIs, no databases, just clean code and local storage.

---

## 📦 Features

- Create, edit, and delete tickets
- Dashboard with ticket statistics (total, open, resolved)
- LocalStorage-based data persistence (no backend required)
- Form validation using Zod and React Hook Form
- Responsive design with Tailwind CSS
- Modular components (Navbar, Footer, TicketCard)
- Authentication (signup/login using localStorage)

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| React            | UI framework                     |
| React Router     | Page navigation                  |
| Tailwind CSS     | Styling                          |
| Zod + RHF        | Form validation                  |
| localStorage     | Data persistence                 |
| Toast            | Notifications                    |

---

## 🌐 Live Demo

[🔗 View deployed app](https://tix-ticketapp-react.netlify.app/)

---

Each ticket includes:

```json
{
  "id": 1690000000,
  "title": "Example Ticket",
  "status": "open",
  "description": "Optional description",
  "created_at": "2025-10-28 11:55:00"
}