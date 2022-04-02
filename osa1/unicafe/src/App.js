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
    <div>
      <p>{props.text} {props.value} {extension}</p>
    </div>
  )
}

const Statistics = (props) => {

  if (props.total === 0) {
    return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>      
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.total} />
      <StatisticLine text="average" value={props.sum / props.total} />
      <StatisticLine text="positive" value={100 * props.good / props.total} />
    </div>
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
