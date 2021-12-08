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

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text} </td>
      <td> {props.value} </td>
    </tr>
  )
}

const Statistics = (props) => {
  const sumall = props.good + props.neutral + props.bad
  const sumval = props.good * 1 + props.neutral * 0 + props.bad * -1
  
  
  if (sumall === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }  
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value = {sumall} />
        <StatisticLine text="average" value = {(sumval) / (sumall)}/>
        <StatisticLine text="positive" value = {100 * (props.good) / (sumall) + '%'}/>
      </tbody>
    </table>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <>
        <Header head='Give feedback' />
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
        <Header head='Statistics' />        
        <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App