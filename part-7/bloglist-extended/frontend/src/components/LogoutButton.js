import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleClick = async () => {
    dispatch(logout())
  }

  return (
    <div>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default LogoutButton
