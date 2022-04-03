import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
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
  const [votes, setVotes] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [maxVotes, setMaxVotes] = useState(0)

  const generateRandom = () => {
    let min = 0
    let max = anecdotes.length - 1
    let rnd = Math.floor(Math.random() * (max - min + 1)) + min
    setSelected(rnd)    
    setVotes(points[rnd])
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setVotes(copy[selected])
    let max = Math.max(...copy)
    const i = copy.findIndex(a => a === max)
    setMaxVotes(i)
  }

  return (
    <div>      
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes} votes</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={generateRandom} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVotes]}
      <p>has {points[maxVotes]} votes</p>
    </div>
  )

}

export default App;
