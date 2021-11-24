export const open = (id) => {
  return {
    type: 'SHOW_PRODUCT',
    payload: id
  }
}

export const hide = (id) => {
  return {
    type: 'HIDE_PRODUCT',
    payload: id
  }
}

const toggleReducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_PRODUCT':
    return { ...state, [action.payload]: true }
  case 'HIDE_PRODUCT':
    return { ...state, [action.payload]: false }
  default:
    return state
  }
}

export default toggleReducer
