/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cyan': {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        'brand-yellow': {
          400: '#ffd700',
          500: '#ffb700',
          600: '#ff9800',
        }
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-cyan': '8px 8px 0px 0px rgba(0, 188, 212, 1)',
        'brutal-yellow': '8px 8px 0px 0px rgba(255, 183, 0, 1)',
      },
    },
  },
  plugins: [],
}

