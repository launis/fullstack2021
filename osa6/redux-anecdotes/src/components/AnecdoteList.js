import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {

  const Anecdote = ({ anecdote, handleClick }) => {

    return(
      <div onClick={handleClick}>
        <div>{anecdote.content}</div>
        has {anecdote.votes}
        <button onClick={() => props.voteAnecdote(anecdote)}>vote</button>
      </div>
    )
  }

  return (
    <div>
      {props.anecdotes
        .sort((a,b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)