const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {  
    mode: 'development',
    entry: path.join(__dirname, '/src/index.js'),
    output: {
       filename: 'build.js',
       path: path.join(__dirname, '/dev/dist')},
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
    },
    plugins:[
       new HWP(
          {template: path.join(__dirname,'/src/index.html')}
       )
    ]
}