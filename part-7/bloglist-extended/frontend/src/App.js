import { Routes, Route, Link } from 'react-router-dom'
import UserView from './views/UserView'
import BlogView from './views/BlogView'
import HomeView from './views/HomeView'

import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUsers } from './reducers/allUsersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs()), dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [dispatch])

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<BlogView />} />
        <Route path="/about" element={<HomeView />} />
        <Route path="/users" element={<UserView />} />
      </Routes>
    </div>
  )
}

export default App
