const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.filter
  default:
    return state
  }
}

let timer = 0
export const notify = (filter, delay) => {
  return async (dispatch) => {
    clearTimeout(timer)
    dispatch({
      type: 'NOTIFICATION',
      filter,
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        filter: null,
      })
    }, delay)
  }
}

export default notificationReducer
