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
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
                      '@babel/react',{
                      'plugins': ['@babel/plugin-proposal-class-properties']}]
        }
       }]
    },
    plugins:[
       new HWP(
          {template: path.join(__dirname,'/src/index.html')}
       )
    ]
}