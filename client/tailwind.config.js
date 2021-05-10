module.exports = {
  purge: ['./dist/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': 'rgb(59, 130, 246)',
    }),
    extend: {
      lineHeight: {
        16: '4rem',
      },
      maxWidth: {
        '60': '5%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
