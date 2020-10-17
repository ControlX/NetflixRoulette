import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import movieDetailReducer from './movieDetailReducer'

const rootReducer = combineReducers({
    movieReducer, movieDetailReducer
  })
  
  export default rootReducer