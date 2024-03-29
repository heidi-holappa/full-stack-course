import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: 'Initial message. Set visible to true to show initial content',
    visible: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNewNotification(state, action) {
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

let lastTimeoutId
export const setNotification = (content, seconds) => {
  return async dispatch => {
    if (lastTimeoutId) {
      clearTimeout(lastTimeoutId)
    }
    
    await dispatch(setNewNotification(`You voted ${content}`))
    lastTimeoutId = setTimeout(() => {
        dispatch(hideNotification())
    }, seconds * 1000)
    
  }
}

export const { setNewNotification, hideNotification, storeTimeoutRef } = notificationSlice.actions
export default notificationSlice.reducer