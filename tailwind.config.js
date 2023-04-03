/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // If using `public` directory:
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'user-linear-gradient': 'linear-gradient(to top, #232526, #414345)',
    },
    fontFamily: {
      mons: ['Montserrat', 'sans-serif'],
    }
  },
  },
  plugins: [],
}

