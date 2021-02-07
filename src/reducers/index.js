import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import movieDetailReducer from './movieDetailReducer'
import movieNotFound from './movieNotFound'

const rootReducer = combineReducers({
    movieReducer, movieDetailReducer, movieNotFound
  })
  
  export default rootReducer