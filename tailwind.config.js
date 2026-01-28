/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827", // Charcoal (30%)
        accent: "#D4AF37",  // Gold (10%)
        background: "#FAFAFA", // Light Gray (60%)
        "accent-hover": "#B5952F",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      }
    },
  },
  plugins: [],
}
