// import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(login({ username, password }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input type="text" id="username" name="Username" />
        </div>
        <div>
          password
          <input type="password" id="password" name="Password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// }

export default LoginForm
