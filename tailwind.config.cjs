/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'mobile': {'max': '590px', 'min': '320px'},
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': {'max': '1224px', 'min': '1000px'},
      // => @media (min-width: 1024px) { ... }

      'desktop': {'max': '1524px', 'min': '1280px'},
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
