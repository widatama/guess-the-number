/* global node */
 
const tailwindForms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  // mode: 'jit',
  plugins: [
    tailwindForms,
  ],
  theme: {
    colors: {
      black: '#333333',
      blue: '#0c3a8d',
      gray: '#cccccc',
      white: '#ffffff',
    },
    screens: {
      sm: { max: '500px' },
      md: { max: '1200px' },
      lg: { min: '1201px' },
    },
    extend: {
    },
  },
};
