// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogEntry, addLike } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)

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

  const addVote = () => {
    dispatch(addLike(blog))
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

  return (
    <div style={blogStyle} className="blog">
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <br></br>
      <a href={blog.url} rel="noreferrer">
        {blog.url}
      </a>{' '}
      <br></br>
      Likes {blog.likes} <button onClick={addVote}>like</button> <br></br>
      {blog.user.name}
      <ShowRemoveButton />
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
