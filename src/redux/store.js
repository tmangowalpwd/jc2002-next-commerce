import { auth_reducer } from "./reducers";
import { combineReducers } from 'redux'

export default combineReducers({
  auth: auth_reducer
})