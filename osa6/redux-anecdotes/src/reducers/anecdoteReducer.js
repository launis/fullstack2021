/* eslint-disable no-case-declarations */
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
    const data = { text: `Added anecdote ${content}`, type:'ANECDOTE' }
    dispatch(setNotification(data, 3))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updateAnecdote = await anecdoteService.updateAnecdote(anecdote.id, { votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updateAnecdote
    })
    const data = { text: `Voted anecdote ${anecdote.content}`, type:'VOTE' }
    dispatch(setNotification(data, 3))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
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