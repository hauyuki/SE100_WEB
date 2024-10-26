/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bt: [
        "BalooTammudu2",
        "Arial",
        "sans-serif",
        ...defaultTheme.fontFamily.sans,
      ],
    },

    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
      colors: {
        primary: "#636AE8",

        secondary: "#F4F5F7",
        gray: {
          default: "#878181",
        },
      },
    },
  },
  plugins: [],
};
