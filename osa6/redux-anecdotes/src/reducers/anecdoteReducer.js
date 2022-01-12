/* eslint-disable no-case-declarations */
import { initialState, getId } from '../reducers/store'

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      vote: 0,
      id: getId()
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

const reducer = (state = initialState, action) => {
  console.log('anecdote state now: ', state)
  console.log('anecdote action', action)

  switch(action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'VOTE_ANECDOTE':
    const id = action.data.id
    const anecdoteToChange = state.find(n => n.id === id)
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : changedAnecdote)
  default:
    return state
  }
}

export default reducer