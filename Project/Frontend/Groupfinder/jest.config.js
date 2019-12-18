module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],
  transformIgnorePatterns: [
    "/node_modules(?![\\/]vue-slider-component[\\/])/"],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    "^.+\\.(css|scss|less)$": "jest-css-modules"
  },
  preset: 'ts-jest/presets/js-with-ts'
}
