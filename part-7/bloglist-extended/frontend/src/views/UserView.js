import React from 'react'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAllUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'

const UserView = ({ users }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [dispatch])

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
