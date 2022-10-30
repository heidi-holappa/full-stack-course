import { connect } from 'react-redux'
import { createBlogEntry } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {
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
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Label>title:</Form.Label>
        <Form.Control name="title" id="title-input"></Form.Control>
        <Form.Label>author:</Form.Label>
        <Form.Control name="author" id="author-input"></Form.Control>
        <Form.Label>url:</Form.Label>
        <Form.Control name="url" id="url-input"></Form.Control>
        <Button type="submit">save</Button>
      </Form>
    </div>
  )
}

export default connect(null, { createBlogEntry, createNotification })(BlogForm)
