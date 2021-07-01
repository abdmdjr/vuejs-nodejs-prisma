module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://nodejs:3080',
        changeOrigin: true,
      },
    },
    progress: false,
  },
};
