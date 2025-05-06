/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
        lg: "5rem",
        xl: "7rem",
        "2xl": "9rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
