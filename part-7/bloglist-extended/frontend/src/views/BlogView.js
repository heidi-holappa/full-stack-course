import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'

import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const BlogView = () => {
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  return (
    <div>
      <h2>BlogApp</h2>
      <h2>Login</h2>
      <Notification />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>Blogs</h2>
          <Table striped>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} by {blog.author}
                      <br />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default BlogView
