/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "5rem",
        lg: "6rem",
        xl: "7rem",
        "2xl": "9rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
