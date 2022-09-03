import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: 'initial message',
    visible: true
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        return {
          message: action.payload,
          visible: true
        }
      },
      hideNotification(state, action) {
        return {
            message: '',
            visible: false
        }
      }
    }
})


export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer