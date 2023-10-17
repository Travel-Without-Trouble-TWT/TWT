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
      xs: { min: '375px', max: '639px' },
      // => @media (min-width: 375px and max-width: 639px)
      sm: { min: '640px', max: '767px' },
      // => @media (min-width: 640px and max-width: 767px)
      md: { min: '768px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px)
      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px)
      xl: { min: '1280px' },
      // => @media (min-width: 1280px and max-width: 1535px)
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
