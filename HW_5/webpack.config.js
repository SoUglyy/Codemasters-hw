const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = {
  mode:'development',
  entry: path.resolve(__dirname,'src','index.js'),
  output: {
    filename:'[name].[contenthash].js',
    path: path.resolve(__dirname,'dist'),
    clean:true,

  },  plugins: 
  [new HtmlWebpackPlugin()],
}