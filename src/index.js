import React from 'react';
import ReactDOM from 'react-dom';
import RouletteMain from './components/RouletteMain';
import './components/RouletteMain/roulette_main.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {Provider} from 'react-redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState = {};

const middlewares = [thunk];

let store = createStore(
    rootReducer, initialState, composeEnhancer(applyMiddleware(...middlewares))
);

 const App = () => (
    <div>
        <RouletteMain />
    </div>
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));