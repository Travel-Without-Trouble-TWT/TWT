/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        skyblue: '#90DCE1',
        blue: '#379EFD',
        gray: '#9B9B9B',
        red: '#F40D0D',
        darkgray: '#1f2937',
        lightgray: '#F6F6F6',
        active: 'rgba(0, 0, 0, 0.8)',
        hoverLink: 'rgba(0, 0, 0, 0.6)',
        unActive: 'rgba(0, 0, 0, 0.3)',
      },
    },

    screens: {
      mobile: '360px', // @media (min-width: 360px)
      foldable: '523px', // @media (min-width: 523px)
      tablet: '768px', // @media (min-width: 768px)
      lg: '1060px', // @media (min-width: 1060px)
      xl: '1260px', // @media (min-width: 1260px)
      '2xl': '1460px', // @media (min-width: 1460px)
    },
  },
  plugins: [],
};
