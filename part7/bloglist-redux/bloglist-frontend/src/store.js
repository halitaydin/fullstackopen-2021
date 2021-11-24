import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import toggleReducer from './reducers/toggleReducer'
import loginReducer from './reducers/loginReducer'
import signupReducer from './reducers/signupReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import userReducer from './reducers/userReducers'
import loadingReducer from './reducers/loadingReducer'

const reducer = combineReducers({
  blog:blogReducer,
  login:loginReducer,
  user:userReducer,
  signup:signupReducer,
  notification:notificationReducer,
  enotification:errorNotificationReducer,
  toggle:toggleReducer,
  loading:loadingReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
