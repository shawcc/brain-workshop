/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ink: "#0B1020",
        cream: "#F7F0DC",
        orange: "#D97732",
        cyan: "#3EF3D8",
        red: "#FF5C6C",
      },
      fontFamily: {
        display: ['"Arial Black"', '"Trebuchet MS"', "sans-serif"],
        body: ['"Avenir Next"', "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        toy: "0 8px 0 rgba(0,0,0,0.28), 0 18px 40px rgba(0,0,0,0.22)",
        tile: "0 6px 0 rgba(0,0,0,0.18), inset 0 -8px 18px rgba(11,16,32,0.12)",
      },
    },
  },
  plugins: [],
};
