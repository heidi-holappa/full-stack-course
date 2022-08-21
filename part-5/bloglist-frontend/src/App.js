import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  
  const addBlog = (event) => {
    event.preventDefault()
  
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setInfoMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })
    .catch(error => {
      setErrorMessage(`${error.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
    
  }


  const logoutButton = () => {
    const handleClick = (event) => {
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
      <ErrorNotification message={errorMessage} />
      <Notification message={infoMessage} />
      

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        :
        <div>
          <p>{user.name} logged in</p>
          {logoutButton()}
          <Togglable buttonLabel="new note">
            <BlogForm 
              handleSubmit={addBlog}
              author={newAuthor}
              title={newTitle}
              url={newUrl}
              handleTitleChange={({ target }) => setNewTitle(target.value)}
              handleAuthorChange={({ target }) => setNewAuthor(target.value)}
              handleUrlChange={({ target }) => setNewUrl(target.value)}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
