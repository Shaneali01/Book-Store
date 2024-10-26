/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use 'class' to enable dark mode with a class selector
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};
