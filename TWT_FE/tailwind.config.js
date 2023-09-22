/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        yellow: '#FFCC02',
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
      keyframes: {
        fadeInRight: {
          '0%': {
            opacity: 0,
            transform: 'translateX(100%)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        fadeInRight: 'fadeInRight 0.2s ease-in-out',
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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.touch-action-pan-y': {
          'touch-action': 'pan-y',
        },
        'will-change-transform': {
          'will-change': 'transform',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
