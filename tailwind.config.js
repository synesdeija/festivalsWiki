/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*/*/.{ejs,js,jsx}", 
  "./public/*/*/.css"
  
],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
