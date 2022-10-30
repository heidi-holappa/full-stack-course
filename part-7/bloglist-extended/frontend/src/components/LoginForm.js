// import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="Username"
          ></Form.Control>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="Password"
          ></Form.Control>
          <Button id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
