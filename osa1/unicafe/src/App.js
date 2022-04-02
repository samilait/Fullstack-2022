import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  let extension = ""

  if (props.text === "positive") {
    extension = "%"
  }

  return (
    <>
      <td>{props.text}</td>
      <td>{props.value} {extension}</td>
    </>
  )
}

const Statistics = (props) => {

  if (props.total === 0) {
    return (
    <>
      <p>No feedback given</p>
    </>
    )
  }

  return (
    <table>      
      <tbody>
        <tr><StatisticLine text="good" value={props.good} /></tr>
        <tr><StatisticLine text="neutral" value={props.neutral} /></tr>
        <tr><StatisticLine text="bad" value={props.bad} /></tr>
        <tr><StatisticLine text="all" value={props.total} /></tr>
        <tr><StatisticLine text="average" value={props.sum / props.total} /></tr>
        <tr><StatisticLine text="positive" value={100 * props.good / props.total} /></tr>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setSum(sum + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)    
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setSum(sum - 1)    
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <h1>statistics</h1>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        sum={sum} 
      />
    </div>
  )
}

export default App;
