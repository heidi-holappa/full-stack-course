import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
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


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title: <input
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      /> <br></br>
      author: <input
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      /><br></br>
      url: <input
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      /><br></br>
      <button type="submit">save</button>
    </form> 

  )

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
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {logoutButton()}
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
