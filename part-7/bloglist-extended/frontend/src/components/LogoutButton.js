import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleClick = async () => {
    dispatch(logout())
  }

  return (
    <div>
      <Button onClick={handleClick}>logout</Button>
    </div>
  )
}

export default LogoutButton
