import signupService from '../services/users'
import { notify } from '../reducers/notificationReducer'
import { enotify } from '../reducers/errorNotificationReducer'

export const signup = (newusername, newpassword) => {
  return async (dispatch) => {
    try {
      const user = await signupService.users({
        newusername,
        newpassword,
      })
      JSON.stringify(user)
      dispatch({
        type: 'SIGNUP',
        data: user,
      })
      dispatch(notify(`${user.username} signup successful`, 5000))
    } catch (error) {
      error.response.data.error ? dispatch(enotify(`${error.response.data.error}`, 5000)) : null
    }
  }
}

const signupReducer = (state = null, action) => {
  switch (action.type) {
  case 'SIGNUP':
    return action.data
  default:
    return state
  }
}

export default signupReducer