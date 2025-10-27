/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        statusOpen: "#10b981",
        statusInProgress: "#f59e0b",
        statusClosed: "#6b7280"
      }
    },
  },
  plugins: [],
}

