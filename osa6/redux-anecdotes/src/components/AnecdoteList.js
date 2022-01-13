import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  const dispatch = useDispatch()

  const vote = () => {
    dispatch(voteAnecdote(anecdote))
    const data = { text: `Voted anecdote ${anecdote.content}`, type:'VOTE' }
    dispatch(setNotification(data, 3))
  }

  return(
    <div onClick={handleClick}>
      <div>
        {anecdote.content}
      </div>
       has {anecdote.votes}
      <button onClick={vote}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdote
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.content.toLowerCase()))
    .sort((a,b) => b.votes - a.votes))
  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </ul>
  )
}

export default AnecdoteList