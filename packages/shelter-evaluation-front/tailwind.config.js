const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },
    colors: {
      black: {
        ...colors.black,
        DEFAULT: '#323232',
      },
      gray: {
        ...colors.gray,
        DEFAULT: '#ededed',
      },
      white: {
        ...colors.white,
        DEFAULT: '#ffffff',
      },
      red: {
        ...colors.red,
        DEFAULT: '#f5333f',
      },
      blue: {
        ...colors.blue,
        DEFAULT: '#011e41',
      },
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      gray: '#ededed',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};