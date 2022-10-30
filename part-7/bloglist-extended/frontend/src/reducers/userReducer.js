import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/user'
import { createNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loggedInUser: (state, action) => {
      return action.payload
    },
    logoutUser: (state, action) => {
      return action.payload
    },
  },
})

export const login = (content) => {
  return async (dispatch) => {
    try {
      const userInfo = await loginService.login(content)
      userService.setUser(userInfo)
      dispatch(loggedInUser(userInfo))
      dispatch(
        createNotification(
          `Login successful. Welcome, ${userInfo.name}!`,
          'info',
          5
        )
      )
    } catch (error) {
      dispatch(createNotification('Login failed. Try again.', 'alert', 5))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    await userService.clearUser()
    dispatch(loggedInUser(null))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await userService.getUser()
    dispatch(loggedInUser(user))
  }
}

export const { loggedInUser } = userSlice.actions
export default userSlice.reducer
