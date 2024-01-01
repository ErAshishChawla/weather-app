/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      fontFamily: {
        montserrat: "Montserrat, sans-serif",
      },
      boxShadow: {
        primary:
          "inset 0px 5px 15px rgba(0, 0, 0, 0.4),inset 0px -5px 15px rgba(255, 255, 255, 0.4)",
        secondary: "box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2)",
        search: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
        "extreme-outside":
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        "button-pressed":
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        button: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
      backgroundImage: {
        sun: "linear-gradient(180deg, #ffcc89, #d8860b)",
      },
      colors: {
        lightModeBg: "#dee4e7",
        lightModeText: "#282d3",
      },
    },
  },
  plugins: [],
};
