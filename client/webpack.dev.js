const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    publicPath: `http://localhost:8080/`,
  },

  mode: 'development',
  devServer: {
    port: 8080,
  },
});