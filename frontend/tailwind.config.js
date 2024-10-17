/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monrope: ["Manrope", "sans-serif"],
        noto: ["Noto Serif Old Uyghur", "serif"]
      }
    },
  },
  plugins: [],
}

