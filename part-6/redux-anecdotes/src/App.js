import { useSelector, useDispatch } from 'react-redux'
import { addVote, newAnecdote } from './reducers/anecdoteReducer'


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    console.log('vote', id)
  }

  const handleAddAnecdote = (event) => {
    console.log('running addAnecdote in App.js')
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => {
          return b.votes - a.votes
        })
        .map(anecdote =>
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
      <form onSubmit={handleAddAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App

/* Forgiveness is divine, but never pay full prize for a late pizza */