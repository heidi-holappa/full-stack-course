import { Routes, Route, Link, useMatch } from 'react-router-dom'
import UserView from './views/UserView'
import BlogView from './views/BlogView'
import HomeView from './views/HomeView'
import NotFound from './views/NotFoundView'
import User from './components/User'
import Blog from './components/Blog'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUsers } from './reducers/allUsersReducer'
import LogoutButton from './components/LogoutButton'

import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)
  const loggedUser = useSelector((state) => state.user)

  const match = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const user = match
    ? users.find((user) => user.username === match.params.id)
    : null

  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

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
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/about">
                About
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {loggedUser && (
                <Link style={padding} to="/">
                  <em>{loggedUser.name} logged in</em>
                  <LogoutButton />
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<BlogView />} />
        <Route path="/about" element={<HomeView />} />
        <Route path="/users" element={<UserView users={users} />} />
        <Route path="users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
