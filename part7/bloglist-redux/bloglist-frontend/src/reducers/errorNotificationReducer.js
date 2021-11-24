const errorNotificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'E_NOTIFICATION':
    return action.filter
  default:
    return state
  }
}

let timer = 0
export const enotify = (filter, delay) => {
  return async (dispatch) => {
    clearTimeout(timer)
    dispatch({
      type: 'E_NOTIFICATION',
      filter,
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'E_NOTIFICATION',
        filter: null,
      })
    }, delay)
  }
}

export default errorNotificationReducer