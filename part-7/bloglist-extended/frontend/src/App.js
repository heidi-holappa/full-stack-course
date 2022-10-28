import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { createNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  // const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong credentials', 'alert')
    }
  }

  // const addBlog = (blogObject) => {
  //   blogFormRef.current.toggleVisibility()
  //   blogService
  //     .create(blogObject)
  //     .then((returnedBlog) => {
  //       setBlogs(blogs.concat({ ...returnedBlog, user }))
  //       notify(`a new blog '${blogObject.title}' by ${blogObject.author} added`)
  //     })
  //     .catch((error) => {
  //       notify('creating a blog failed: ' + error.response.data.error, 'alert')
  //     })
  // }

  const notify = (message, type = 'info') => {
    dispatch(createNotification(message, type, 5))
  }

  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    blogService
      .remove(id)
      .then(() => {
        setBlogs(
          blogs.filter(function (blog) {
            return blog.id !== id
          })
        )
        notify(`Successfully removed blog ${blog.title} by ${blog.author}`)
      })
      .catch((error) => {
        notify(
          `Removing a blog failed. Error: ${error.response.data.error}`,
          'alert'
        )
      })
  }

  const handleAddLike = (id) => {
    const blogObject = blogs.find((blog) => blog.id === id)
    const updatedBlogObject = { ...blogObject, likes: blogObject.likes + 1 }
    blogService
      .update(id, updatedBlogObject)
      .then(() => {
        setBlogs(
          blogs.map((blog) => (blog.id !== id ? blog : updatedBlogObject))
        )
      })
      .catch((error) => {
        notify(
          `Liking a blog failed. Error: ${error.response.data.error}`,
          'alert'
        )
      })
  }

  const logoutButton = () => {
    const handleClick = () => {
      window.localStorage.removeItem('loggedBlogappUser')
      window.location.reload()
    }
    return (
      <div>
        <button onClick={handleClick}>logout</button>
      </div>
    )
  }

  return (
    <div>
      <h2>BlogApp</h2>
      <h2>Login</h2>
      <Notification />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {logoutButton()}
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
            {/* <BlogForm createBlog={addBlog} /> */}
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleAddLike={handleAddLike}
                handleRemoveBlog={removeBlog}
                currentUser={user}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
