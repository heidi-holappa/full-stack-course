import { useState } from 'react'

const Display = (props) => {
  return (
    <div>Has {props.value} votes</div>
  )
}

const MostVotes = (props) => {
  let maxValue = indexOfMaxValue(props.votes)
  if (maxValue === -1) {
    return (
      <div>No votes yet.</div>
    )
  }
  return (
    <div>
      {props.anecdotes[maxValue]}<br />
      Has {props.votes[maxValue]} votes.
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function newTable(selected, votes) {
  const copy = [...votes]
  copy[selected] += 1
  return copy
}

function indexOfMaxValue(votes) {

  let max = votes[0];
  let maxIndex = 0;

  for (var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
          maxIndex = i;
          max = votes[i];
      }
  }

  if (votes[maxIndex] === 0) {
    return -1
  }

  return maxIndex;
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
  const votes_table = new Uint8Array(anecdotes.length)
  const [votes, setVotes] = useState(votes_table)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      <Display value={votes[selected]} />
      <Button handleClick={() => setVotes(newTable(selected, votes))} text='vote' />
      <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App