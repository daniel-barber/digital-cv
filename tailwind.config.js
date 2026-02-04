/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  safelist: [
    "from-blue-500",
    "to-cyan-500",
    "from-purple-500",
    "to-pink-500",
    "from-emerald-500",
    "to-teal-500",
    "from-orange-500",
    "to-red-500",
    "bg-gradient-to-r",
  ],
  theme: { extend: {} },
  plugins: [],
};
