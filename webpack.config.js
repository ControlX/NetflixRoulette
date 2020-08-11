console.log("==Logging environment variable: ", process.env.NODE_ENV);
module.exports = process.env.NODE_ENV === 'development' ? require('./webpack.config.dev') : require('./webpack.config.prod');