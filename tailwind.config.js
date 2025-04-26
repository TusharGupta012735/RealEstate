/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        progress: 'progress 2s linear'
      },
      keyframes: {
        progress: {
          '0%': { left: '-100%' },
          '100%': { left: '0' }
        }
      },
      colors: {
        gray: {
          950: '#0A0C13'
        }
      }
    },
  },
  plugins: [],
};