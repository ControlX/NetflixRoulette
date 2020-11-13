const clientConfig = require('./webpack.config.client');
const serverConfig = require('./webpack.config.server');

console.log("==Logging environment variable: ", process.env.NODE_ENV);

module.exports = [clientConfig, serverConfig, process.env.NODE_ENV === 'development' ? require('./webpack.config.dev') : require('./webpack.config.prod')];