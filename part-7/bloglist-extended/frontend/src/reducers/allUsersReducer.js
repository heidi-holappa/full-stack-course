import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const allUsersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    allUsers: (state, action) => {
      return action.payload
    },
  },
})

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(allUsers(users))
  }
}

export const { allUsers } = allUsersSlice.actions
export default allUsersSlice.reducer
