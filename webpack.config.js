const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'js/[name].bundle-betta-v1.0.16.js',
    path: path.resolve(__dirname, 'dist', 'dist-betta-v1.0.16'),
    chunkFilename: 'js/[name].bundle-betta-v1.0.16.js',
    // filename: 'bundle-betta-v1.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      images: path.resolve(__dirname, 'src', 'public', 'images'),
      ui: path.resolve(__dirname, 'src', 'ui'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      store: path.resolve(__dirname, 'src', 'store'),
      hooks: path.resolve(__dirname, 'src', 'hooks'),
      api: path.resolve(__dirname, 'src', 'api'),
    }
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],

      },
      {
        test: /\.(woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: 'assets/images',
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new miniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  devServer: {
    historyApiFallback: true,
  }
}