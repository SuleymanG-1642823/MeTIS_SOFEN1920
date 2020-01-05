module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'indent': 'off',
    'vue/script-indent': 'off',
    'vue/html-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/this-in-template': 'off',
    'vue/html-quotes': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/v-bind-style': 'off',
    'vue/no-spaces-around-equal-signs-in-attribute': 'off',
    'vue/name-property-casing': 'off'
  }
}
