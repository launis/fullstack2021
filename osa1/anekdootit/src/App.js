import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = (props) => {
  return (
      <h1>{props.head}</h1>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const nullArray = Array(anecdotes.length).fill(0)
  const [points, setVotes] = useState(nullArray)

  const Vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setVotes(copy)
  }

  const RandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const maxPoints = Math.max(...points)
  const maxPointsIndex = points.indexOf(maxPoints)

  return (
    <>
    <Header head='Anecdote of today' />
    <div>{anecdotes[selected]}</div>
    <Button handleClick={RandomAnecdote} text='New anecdote!'/>
    <Button handleClick={Vote} text='Vote'/>
    <Header head='Anecdote with most votes' />
    <div>{anecdotes[maxPointsIndex]} {maxPoints} votes</div>
    </>
  )
}

export default App