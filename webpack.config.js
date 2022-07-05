const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        exclude:/main.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /main.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      }
    ],
  }, 
  optimization: {},
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Configuracion de Webpack',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css'
    }),
    new CopyPlugin({
      patterns: [
        {from: './src/assets', to: "assets/"},
      ]
    })
  ],
}