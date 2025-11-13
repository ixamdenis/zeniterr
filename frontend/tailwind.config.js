// Archivo: frontend/tailwind.config.js (CÓDIGO 100% REEMPLAZADO)
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Tipografía para Títulos/Acentos (Playfair Display)
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        // Tipografía para Cuerpo/General (Raleway)
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}