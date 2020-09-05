import React from 'react';
import ReactDOM from 'react-dom';
import RouletteMain from './components/RouletteMain'
import './components/RouletteMain/roulette_main.css'

const App = () => (
    <div>
        <RouletteMain />
    </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));