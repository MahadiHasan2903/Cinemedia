/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "500px": "300px",
        "1100px": "1110px",
        "1200px": "1200px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  variants: {},
  plugins: [import("tailwindcss"), import("autoprefixer")],
};
