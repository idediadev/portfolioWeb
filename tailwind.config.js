/*
@author       : Davide Taddia
@version      : 0.2
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Updated TailwindCSS configuration for unified navbar
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
        // Dark mode palette - wikiTADD style
        'dark': {
          'highlight': '#00FF7F',   // Verde brillante principale
          'action': '#6DE6B6',      // Verde secondario per azioni
          'accent': '#02B55E',      // Verde per accenti
          'text': '#FFFFFF',        // Testo principale
          'bg': '#080C13',          // Sfondo principale
          'button': '#3B82F6',      // Pulsanti blu
          'button-text': '#FFFFFF', // Testo pulsanti
        },
        // Light mode palette
        'light': {
          'highlight': '#008F4F',   // Verde scuro per evidenziazioni
          'action': '#007D5B',      // Verde scuro per azioni
          'accent': '#A1E8D9',      // Verde chiaro per accenti
          'text': '#222222',        // Testo scuro
          'bg': '#F8F8F8',          // Sfondo chiaro
          'button': '#1D4ED8',      // Pulsanti blu scuro
          'button-text': '#FFFFFF', // Testo pulsanti bianco
        },
        // Colori specifici navbar wikiTADD
        'wikitadd': {
          'primary': '#00FF7F',
          'secondary': '#6DE6B6',
          'accent': '#02B55E',
          'bg-dark': '#080C13',
          'bg-light': '#F8F8F8',
          'border': 'rgba(0, 255, 127, 0.1)',
          'hover': 'rgba(0, 255, 127, 0.2)',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out infinite 1s',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-indicator': 'pulse-indicator 2s infinite',
        'gradient-spin': 'gradient-spin 8s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-indicator': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backdropBlur: {
        'xs': '2px',
        'navbar': '15px',
        'modal': '20px',
      },
      boxShadow: {
        'navbar': '0 4px 20px rgba(0, 0, 0, 0.2)',
        'navbar-scrolled': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'wikitadd': '0 4px 12px rgba(0, 255, 127, 0.3)',
        'wikitadd-hover': '0 8px 20px rgba(0, 255, 127, 0.4)',
      }
    },
  },
  plugins: [],
}