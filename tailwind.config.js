/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#80142B",
          "burgundy-dark": "#5E0D1E",
          "burgundy-deep": "#420914",
          "burgundy-light": "#9E1B38",
          "burgundy-hover": "#6B0F23",
          cream: "#FAF4F5",
          "cream-light": "#FDF8F9",
          muted: "#7D666C",
          charcoal: "#2C1B1F",
          accent: "#E63946",
          teal: "#2A9D8F",
          gold: "#E9C46A"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(128, 20, 43, 0.08)',
        'premium-hover': '0 30px 60px -12px rgba(128, 20, 43, 0.16)',
        'glow': '0 0 25px rgba(128, 20, 43, 0.25)',
      }
    },
  },
  plugins: [],
}
