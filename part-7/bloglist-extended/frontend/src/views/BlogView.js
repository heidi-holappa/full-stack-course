import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import LogoutButton from '../components/LogoutButton'

const BlogView = () => {
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)
  console.log(blogs)

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
          <LogoutButton />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogView
