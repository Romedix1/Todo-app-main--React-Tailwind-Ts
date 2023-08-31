/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        'BrightBlue': '#3a7bfd',


        'VeryLightGray': '#fafafa',
        'VeryLightGrayishBlue': '#e4e5f1',
        'LightModeLightGrayishBlue': '#d2d3db',
        'LightModeDarkGrayishBlue': '#9394a5',
        'LightModeVeryDarkGrayishBlue' : '#484b6a',

        'VeryDarkBlue': '#161722',
        'VeryDarkDesaturatedBlue': '#25273c',
        'DarkModeLightGrayishBlue': '#cacde8',
        'LightGrayishBlueHover' : '#e4e5f1',
        'DarkModeDarkGrayishBlue': '#777a92',
        'DarkModePrimaryVeryDarkGrayishBlue': '#4d5066',
        'DarkModeSecondaryVeryDarkGrayishBlue': '#393a4c'
        },
      },
    },
  plugins: [],
}
