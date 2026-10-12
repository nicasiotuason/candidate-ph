/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 10px 25px -5px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(226, 232, 240, 0.8)',
      },
      colors: {
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#EFF6FF',
          orange: '#F97316',
          'orange-hover': '#EA580C',
          'orange-light': '#FFF7ED',
        }
      }
    },
  },
  plugins: [],
}
