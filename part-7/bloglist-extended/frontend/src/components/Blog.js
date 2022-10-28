// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogEntry, addLike } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    padding: '4px',
  }

  const removeButtonStyle = {
    backgroundColor: '#f44336',
    cursor: 'pointer',
    color: 'white',
    textAlign: 'center',
    padding: '5px',
    textDecoration: 'none',
    display: 'inline-block',
    borderRadius: '4px',
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const addVote = () => {
    dispatch(addLike(blog))
    // addLike(blog)
    // handleAddLike(blog.id)
  }

  const removeBlog = () => {
    if (
      window.confirm(
        `Are you sure you want to delete entry '${blog.title}' by ${blog.author}?`
      )
    ) {
      dispatch(deleteBlogEntry(blog))
    }
  }

  const ShowRemoveButton = () => {
    if (blog.user.username === currentUser.username) {
      return (
        <div className="blog">
          <br></br>
          <button style={removeButtonStyle} onClick={removeBlog}>
            remove
          </button>
        </div>
      )
    }
  }

  if (expanded) {
    return (
      <div style={blogStyle} className="blog">
        &apos;{blog.title}&apos; by {blog.author}{' '}
        <button onClick={toggleExpanded}>view</button>
        <br></br>
        {blog.url} <br></br>
        Likes {blog.likes} <button onClick={addVote}>like</button> <br></br>
        {blog.user.name}
        <ShowRemoveButton />
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      &apos;{blog.title}&apos; by {blog.author}{' '}
      <button onClick={toggleExpanded}>view</button>
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   handleAddLike: PropTypes.func.isRequired,
//   handleRemoveBlog: PropTypes.func.isRequired,
//   currentUser: PropTypes.object.isRequired,
// }

export default Blog
// export default connect(null, { deleteBlogEntry })(Blog)
