/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cerulean: {
          DEFAULT: '#4A9FC4',
          light: '#D6EEF8',
        },
        moss: {
          DEFAULT: '#6B8F5E',
          light: '#D8E8D3',
        },
        amber: {
          DEFAULT: '#C8922A',
          light: '#FFF0D0',
        },
        lavender: {
          DEFAULT: '#9070B8',
          light: '#EDE5F5',
        },
        coral: {
          DEFAULT: '#C07060',
          light: '#F5E8E5',
        },
        warm: {
          DEFAULT: '#B09070',
          light: '#F0EAE0',
        },
        parchment: '#F2EDE4',
        surface: '#FAF7F2',
        charcoal: '#2E2E2C',
        muted: '#7A7870',
        lborder: '#D8D4CC',
        lifebg: '#EDEAE2',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
