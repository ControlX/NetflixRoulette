const path = require('path');
const HWP = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {  
    devtool: 'eval-source-map',
    mode: 'production',
    entry: path.join(__dirname, '/src/index.js'),
    devServer: {
      historyApiFallback: true,
    },
    output: {
       filename: 'build.js',
       publicPath:'/',
       path: path.join(__dirname, '/prod/dist')},
    module:{
       rules:[{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
                      '@babel/react',{
                      'plugins': ['@babel/plugin-proposal-class-properties']}]
        }
       },
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
       },
       {
         test: /\.(jpe?g|png|gif|svg)$/i, 
         loader: 'url-loader'
       }]
    },
    resolve: {
      modules: [path.resolve(__dirname, "/src"), "node_modules"],
      extensions: [".js", ".jsx", ".json"],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    plugins:[
       new webpack.HashedModuleIdsPlugin(),
       new HWP(
          {template: path.join(__dirname,'/src/index.html')}
       )
    ]
}