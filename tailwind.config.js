const { colors } = require('./src/shared/colors')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}