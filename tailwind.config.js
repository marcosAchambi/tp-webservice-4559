/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // incluye los componentes de Flowbite
  ],
  darkMode: 'class', // Esto es crucial - 'class' permite controlar el modo oscuro con JavaScript
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
