import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total}</p>
      <p>average {props.sum / props.total}</p>
      <p>positive {100 * props.good / props.total} %</p>
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
      {/* <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {sum / total}</p>
      <p>positive {100 * good / total} %</p> */}
    </div>
  )
}

export default App;
