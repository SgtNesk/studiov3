/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        bg: '#f5f3ef',
        bg2: '#eeece7',
        bg3: '#e5e2db',
        ink: '#18160f',
        ink2: '#4a4740',
        ink3: '#96938a',
        border: '#d0cdc5',
        border2: '#e0ddd6',
        'app-white': '#fafaf7',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
