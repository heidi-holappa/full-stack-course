import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogentries',
  initialState: [],
  reducers: {
    appendBlogEntry(state, action) {
      state.push(action.payload)
    },
  },
})

export const createBlogEntry = (newBlogEntry) => {
  return async (dispatch) => {
    const createdEntry = await blogService.create(newBlogEntry)
    dispatch(appendBlogEntry(createdEntry))
  }
}

export const { appendBlogEntry } = blogSlice.actions

export default blogSlice.reducer
