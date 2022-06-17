module.exports = function (proxy) {
  return {
    proxy,
    hot: true,
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      }
    },
    historyApiFallback: true,
  }
}