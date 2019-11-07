/* src: https://dev.to/georgehanson/building-vuejs-applications-with-typescript-1j2n */
module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /.html$/,
            loader: "vue-template-loader",
            exclude: /index.html/
          }
        ]
      }
    }
  }