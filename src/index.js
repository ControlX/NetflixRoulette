import React from 'react';
import ReactDOM from 'react-dom';
import RouletteMain from './components/RouletteMain';
import './components/RouletteMain/roulette_main.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {Provider} from 'react-redux';



// let initialState = [{id:1,name:'John Doe',grade:1,school:'React Redux School'},{id:2,name:'Jane Doe',grade:2,school:'React Redux School'}
// ,{id:3,name:'Terry Adams',grade:3,school:'React Redux School'},{id:4,name:'Jenny Smith',grade:4,school:'React Redux School'}];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState = [];

const middlewares = [thunk];

let store = createStore(
    rootReducer, [], composeEnhancer(applyMiddleware(...middlewares))
);
// if( localStorage.getItem("students") === null)
// localStorage.setItem('students',JSON.stringify(initialState));
// else 
// initialState = JSON.parse(localStorage.getItem('students'));

//Store -> Globalized state

//Action
// Implement data fetches as async actions and pass data to your components with redux.
// Creating, editing, deleting and updating (CRUD operations) of
//films are done as redux actions. Filtering by release date and
//rating done as redux actions. Sorting by genre is done as redux
//actions

const getDataAction = () => {
    return {
        type: 'GET_DATA'
    }
}
//redux get movie list and put it to redux store, useeffect should work as it is, it should dispatch only getmovielist action, useeffect dispatch action movie list component, action get response and update redux store.
//Reducer - Transform action into state to next state
const movieListReducer = (state=[], action) => {
    switch(action.type){
        case 'GET_DATA':
            // return state = 
        
    }
}

//Dispatch

 const App = () => (
    <div>
        <RouletteMain />
    </div>
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));