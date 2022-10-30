import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogEntry, addLike } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  if (!blog) {
    return <div>No blog to display</div>
  }
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const currentUser = useSelector((state) => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    padding: '4px',
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
      navigator('/')
    }
  }

  const ShowRemoveButton = () => {
    if (blog.user.username === currentUser.username) {
      return (
        <div className="blog">
          <br></br>
          <Button variant="danger" onClick={removeBlog}>
            remove
          </Button>
        </div>
      )
    }
  }

  const handleClick = () => {
    navigator(-1)
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
      <br />
      <Button variant="primary" onClick={handleClick}>
        Back
      </Button>
    </div>
  )
}

export default Blog
