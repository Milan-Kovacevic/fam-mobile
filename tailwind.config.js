/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#405D72", // 700
          50: "#EFF3F6",
          100: "#E2E9EE",
          200: "#C1D1DC",
          300: "#A4BBCC",
          400: "#86A5BB",
          500: "#698FAB",
          600: "#517590",
          700: "#405D72",
          800: "#2A3D4B",
          900: "#162027",
          950: "#0B1014",
        },
        secondary: {
          DEFAULT: "#725540", // 600
          50: "#F6F2EF",
          100: "#EBE2DB",
          200: "#D7C4B7",
          300: "#C2A793",
          400: "#B08C73",
          500: "#967054",
          600: "#725540",
          700: "#553F30",
          800: "#38291F",
          900: "#1D1611",
          950: "#0D0A07",
        },
      },
      fontFamily: {
        pthin: ["poppinsThin", "sans-serif"],
        pextralight: ["poppinsExtraLight", "sans-serif"],
        plight: ["poppinsLight", "sans-serif"],
        pregular: ["poppinsRegular", "sans-serif"],
        pmedium: ["poppinsMedium", "sans-serif"],
        psemibold: ["poppinsSemiBold", "sans-serif"],
        pbold: ["poppinsBold", "sans-serif"],
        pextrabold: ["poppinsExtraBold", "sans-serif"],
        pblack: ["poppinsBlack", "sans-serif"],
      },
    },
  },
  plugins: [],
};
// https://www.tints.dev
