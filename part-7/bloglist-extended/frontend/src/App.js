import { useEffect, useRef } from 'react'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs()), dispatch(initializeUser())
  }, [])

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
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
