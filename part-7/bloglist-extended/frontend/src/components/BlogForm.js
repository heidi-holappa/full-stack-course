// import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createBlogEntry } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')

  // const handleTitleChange = (event) => {
  //   setNewTitle(event.target.value)
  // }

  // const handleAuthorChange = (event) => {
  //   setNewAuthor(event.target.value)
  // }

  // const handleUrlChange = (event) => {
  //   setNewUrl(event.target.value)
  // }

  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     title: newTitle,
  //     author: newAuthor,
  //     url: newUrl,
  //   })
  //   setNewTitle('')
  //   setNewAuthor('')
  //   setNewUrl('')
  // }

  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.createBlogEntry(content)
    const message = `blog entry ${content.title} created`
    props.createNotification(message, 'info', 5)
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        title: <input name="title" id="title-input" /> <br></br>
        author: <input name="author" id="author-input" />
        <br></br>
        url: <input name="url" id="url-input" />
        <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// }

// export default BlogForm

export default connect(null, { createBlogEntry, createNotification })(BlogForm)
