/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : For TailwindCSS use, and better manage the pages's styles.
@email        : davide.taddia2@studio.unibo.it
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode palette
        'dark': {
          'highlight': '#00FF7F',   // Testo evidenziato
          'action': '#6DE6B6',      // Testo per azioni
          'accent': '#02B55E',      // Verde per effetti
          'text': '#FFFFFF',        // Testo discorsivo
          'bg': '#080C13',          // Sfondo
          'button': '#3B82F6',      // Pulsanti (sfondo)
          'button-text': '#FFFFFF', // Pulsanti (testo)
        },
        // Light mode palette
        'light': {
          'highlight': '#008F4F',   // Testo evidenziato
          'action': '#007D5B',      // Testo per azioni
          'accent': '#A1E8D9',      // Verde per effetti
          'text': '#222222',        // Testo discorsivo
          'bg': '#F8F8F8',          // Sfondo
          'button': '#1D4ED8',      // Pulsanti (sfondo)
          'button-text': '#FFFFFF', // Pulsanti (testo)
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out infinite 1s',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}