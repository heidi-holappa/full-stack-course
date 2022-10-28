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

// useEffect(() => {
//   const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
//   if (loggedUserJSON) {
//     const user = JSON.parse(loggedUserJSON)
//     setUser(user)
//     blogService.setToken(user.token)
//   }
// }, [])

// const handleLogin = async (event) => {
//   event.preventDefault()
//   try {
//     const user = await loginService.login({
//       username,
//       password,
//     })
//     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
//     blogService.setToken(user.token)
//     setUser(user)
//     setUsername('')
//     setPassword('')
//   } catch (exception) {
//     notify('wrong credentials', 'alert')
//   }
// }

// const notify = (message, type = 'info') => {
//   dispatch(createNotification(message, type, 5))
// }

{
  /* <BlogList /> */
}
{
  /* {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} currentUser={user} />
            ))} */
}
