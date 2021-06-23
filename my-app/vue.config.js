module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://nodejs-server:3080',
          changeOrigin: true
        },
      }
    }
  }