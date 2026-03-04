/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58CC02',
          'green-dark': '#46A302',
          'green-light': '#89E219',
          yellow: '#FFC800',
          blue: '#1CB0F6',
          red: '#FF4B4B',
          orange: '#FF9600',
          purple: '#CE82FF',
          pink: '#FF86D0',
        },
      },
      fontFamily: {
        display: ['Wix Madefor Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        sans: ['Wix Madefor Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'duo': '0 4px 0 0 #46A302',
        'duo-hover': '0 2px 0 0 #46A302',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.1)',
        'glow-green': '0 0 24px rgba(88,204,2,0.25)',
        'glow-blue': '0 0 24px rgba(28,176,246,0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
