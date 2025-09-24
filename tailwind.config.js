/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#181818",
        card: "#212121",
        text: "#ECECF1",
        muted: "#9A9B9F",
        primary: "#10A37F",
        primaryHover: "#0E8F6E",
      },
      fontFamily: {
        thai: ['var(--font-thai)', 'sans-serif'],
      },
      keyframes: {
        'raven-alert': {
          '0%, 100%': {
            transform: 'rotate(-25deg) scale(1.1)',
            filter: 'drop-shadow(0 0 6px #a855f7)',
          },
          '50%': {
            transform: 'rotate(25deg) scale(1.2)',
            filter: 'drop-shadow(0 0 8px #c084fc)',
          },
        },
      },
      animation: {
        'raven-alert': 'raven-alert 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
