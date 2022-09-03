import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const handleAddAnecdote = (event) => {
      console.log('running addAnecdote in App.js')
      event.preventDefault()
      const content = event.target.anecdote.value
      console.log(content)
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleAddAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm