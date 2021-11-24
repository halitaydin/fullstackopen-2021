import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'
import { enotify } from './errorNotificationReducer'

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
      dispatch(notify(`${user.username} logged in`, 5000))
    } catch (error) {
      console.log(error.response.data.error)
      dispatch(enotify('Wrong Username or Password', 5000))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'INIT_USER',
      data: user
    }
  }

  return {
    type: 'INIT_USER',
    data: null
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export default loginReducer
