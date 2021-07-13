const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case "SHOW_NOTIFICATION":
        return action.notification;
      default:
        return state;
    }
  };

  let timer = 0
  export const showNotification = (notification, delay) => {
    return async dispatch => {
      clearTimeout(timer)
      dispatch ({
          type: 'SHOW_NOTIFICATION',
          notification,
      })
      timer = setTimeout(() => {
        dispatch({
          type: 'SHOW_NOTIFICATION',
          notification: null
        })
      }, delay)
    }
  }

  export default notificationReducer;
