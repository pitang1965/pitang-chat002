const HtmlWebPackPlugin = require('html-webpack-plugin');

const deps = require('./package.json').dependencies;
module.exports = {
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
      }
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
  ],
};
