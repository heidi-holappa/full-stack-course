import React from 'react'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import LogoutButton from '../components/LogoutButton'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAllUsers } from '../reducers/allUsersReducer'

const UserView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAllUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)
  const allUsers = useSelector((state) => state.getAllUsers)

  if (user) {
    console.log(`Logged in user: ${user.username}`)
    console.log(`All users: ${allUsers}`)
  }
  return (
    <div>
      {allUsers === null ? (
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
          <ul>
            {allUsers.map((user) => (
              <li key={user.id}> {user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserView
