const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  /* 入口 */
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src/index.js')],

  /* 输出到dist文件夹，输出文件名字为bundle.js */
  output: {
    path: path.join(__dirname, './dist'),
    // path: 'C:\\wamp64\\www',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: ['babel-loader?cacheDirectory=true', 'eslint-loader'],
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /plugins/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html')
    })
    // new UglifyJSPlugin()
  ],
  devServer: {
    port: 3344,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      '/datasys/rbac/user/grantaccess/': {
        target: 'http://10.19.19.23:25175'
      },
      '/datasys/*': {
        target: 'http://10.19.19.23:8617'
      }
    }
  },
  devtool: 'inline-source-map'
}
