/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
          'dark-100':'#121212',
          'dark-200':'#282828',
          'dark-300':'#3f3f3f',
          'dark-400':'#575757',
          'dark-500':'#717171',
          'dark-600':'#8b8b8b'
      },
      fontFamily: {
          'figtree':'figtree'
      },
    },
  },
  plugins: [],
}

