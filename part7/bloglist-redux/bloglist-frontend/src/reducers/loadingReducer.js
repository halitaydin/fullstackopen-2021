const initialState = {
  showLoading: false
}

export const loadingAction = (status) => {
  return {
    type:'LOADING',
    status
  }
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOADING':
    return { ...state, showLoading:action.status }
  default:
    return state
  }
}

export default loadingReducer
