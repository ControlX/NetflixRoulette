import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './Components/Component1/AppComponent'
import './Components/Component1/styles.css'

const App = () => (
    <div className='main-div-properties'>
        {<AppComponent />}
    </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));