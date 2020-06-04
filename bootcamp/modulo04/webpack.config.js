const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), // de onde vai pegar o que vai compilar
  output: {
    path: path.resolve(__dirname, 'public'), // onde vai ser compilado
    filename: 'bundle.js' // nome do arquivo que vai ser compilado
  },
  devServer: {
    contentBase: path.resolve(__dirname,'public') // onde vai ser compilado
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }, {
        test: /\.*\.(gif|png|jpe?g)$/i,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  }
};