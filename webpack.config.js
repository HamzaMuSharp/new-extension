const path = require('path');

module.exports = {
  entry: './public/background.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'serviceworker.js'
  },
  mode: 'production'
};