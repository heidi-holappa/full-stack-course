import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const currentFilter = useSelector(state => state.filter)
  console.log(anecdotes)

  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote.id))
    dispatch(setNotification(`You voted ${anecdote.content}`))
    setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
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