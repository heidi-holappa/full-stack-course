import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const handleAddAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(content)
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


const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)