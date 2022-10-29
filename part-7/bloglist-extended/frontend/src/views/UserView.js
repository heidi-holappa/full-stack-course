import React from 'react'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import LogoutButton from '../components/LogoutButton'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAllUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'

const UserView = ({ users }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  // const match = useMatch('/users/:id')
  // const user = match
  //   ? users.find(user => user.id === Number(match.params.id))
  //   : null

  if (user) {
    console.log(`Logged in user: ${user.username}`)
    console.log(`All users: ${users}`)
  }
  return (
    <div>
      {users === null ? (
        <div>
          <h2>Users</h2>
          <div>Log in to view registered users.</div>
          <Togglable buttonLabel="login">
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <LogoutButton />
          <h2>Users</h2>
          {users.map((user) => (
            <div key={user.id}>
              <Link to={`/users/${user.username}`}>{user.name}</Link>, blogs:{' '}
              {user.blogs.length}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserView

{
  /* <Route path="/users/:id" element={<User user={user} />} /> */
}
