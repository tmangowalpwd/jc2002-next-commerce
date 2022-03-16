import { auth_reducer, network_reducer } from "./reducers";
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  auth: auth_reducer,
  network: network_reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store