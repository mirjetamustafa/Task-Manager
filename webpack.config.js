import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
    hot: true,
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i, // ← kjo është shumë e rëndësishme
        use: [
          'style-loader', // injekton CSS në <head>
          'css-loader', // interpreton import-et e CSS
          'postcss-loader', // përpunon Tailwind/PostCSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/login.html',
      filename: 'login.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/dashboard.html',
      filename: 'dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/register.html',
      filename: 'register.html',
    }),
  ],
}
