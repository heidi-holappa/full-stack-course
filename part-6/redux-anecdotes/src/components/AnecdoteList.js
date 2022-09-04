import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdoteVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const currentFilter = useSelector(state => state.filter)
  console.log(anecdotes)

  const vote = async (anecdote) => {
    dispatch(incrementAnecdoteVotes(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    console.log('vote', anecdote)
  }

  return (
    <div>
      {anecdotes
        .filter(selectedAnecdote => selectedAnecdote.content.toLowerCase().includes(currentFilter.text.toLowerCase()))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}


export default AnecdoteList