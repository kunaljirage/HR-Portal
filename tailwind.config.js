/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.{js,jsx,ts,tsx}',
    './app/views/**/*'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

