import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'
const notfication_wait = 3

export const createAnecdote = (content) => {

  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
    const notfication = { text: `Added anecdote ${data.content}`, type:'ANECDOTE' }
    dispatch(setNotification(notfication, notfication_wait))
  }
}

export const voteAnecdote = (anecdote) => {

  return async (dispatch) => {
    const data = await anecdoteService.updateAnecdote(anecdote.id, { votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data
    })
    const notfication = { text: `Voted anecdote ${data.content}`, type:'VOTE' }
    dispatch(setNotification(notfication, notfication_wait))
  }
}

export const initializeAnecdotes = () => {

  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data
    })
  }
}

const reducer = (state = [], action) => {
  console.log('action', action)
  console.log('state', state)
  switch(action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'VOTE_ANECDOTE': {
    return state.map((anecdote) =>
      anecdote.id === action.data.id
        ? action.data
        : anecdote
    )}
  case 'INIT_ANECDOTE':
    return action.data
  default:
    return state
  }
}

export default reducer