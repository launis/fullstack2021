import React from 'react'
import { useSelector } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'

// import { useSelector, useDispatch } from 'react-redux'


const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state)
  //  const dispatch = useDispatch()


  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE',
      id: id
    })
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App