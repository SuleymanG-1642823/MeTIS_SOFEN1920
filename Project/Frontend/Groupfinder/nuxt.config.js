
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/vue-star-rating',
    '~/plugins/vue-sidebar-menu'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module', '@nuxt/typescript-build',
  ],
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://www.npmjs.com/package/nuxt-vuex-localstorage
    'nuxt-vuex-localstorage'
    //['nuxt-vuex-localstorage', {  //  If not entered, “sessionStorage” is the default value
    //}],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  },
  env: {
     API_PORT: process.env.API_PORT 
  },
  router: {
    middleware: [
      'Auth'
    ],
  }
}
