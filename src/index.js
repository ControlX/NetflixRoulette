import React from 'react';
import ReactDOM from 'react-dom';

//Why process.env.NODE_ENV always resolve to production, though I'm running on development.
//If I console.log in webpack.config.js it shows correct output...
console.log("==Logging environment variable: ", process.env.NODE_ENV);

const App = () => (
    <div>
        <h1>Webpack and other configurations in ReactJS.</h1>
        <h2>Application is running on the environment: {process.env.NODE_ENV}</h2>
    </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));