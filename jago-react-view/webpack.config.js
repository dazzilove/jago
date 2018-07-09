const path = require('path')

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        }
      ]
    },
}
