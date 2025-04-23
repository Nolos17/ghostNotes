/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}", // Escanea archivos HTML y JS en public/
    "./js/**/*.js",            // Escanea archivos JS en js/ y subdirectorios
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}