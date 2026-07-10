/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: 'var(--primary)',
        primaryHover: 'var(--primaryHover)',
        textMain: 'var(--textMain)',
        textMuted: 'var(--textMuted)',
        border: 'var(--border)',
      }
    },
  },
  plugins: [],
}
