import anecdoteService from "../services/anecdotes"

export const createNote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newAnecdote,
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    const newVote = await anecdoteService.voted(id)
    dispatch({
      type: "VOTE",
      data: newVote
    })
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      return state.map((item) =>
      item.id !== action.data.id ? item : action.data
    )
    default:
      return state;
  }
};

export default anecdoteReducer;
