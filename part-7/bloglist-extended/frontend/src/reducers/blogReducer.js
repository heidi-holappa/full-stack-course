import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogentries',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blog = action.payload
      return blog.sort((a, b) => b.likes - a.likes)
    },
    appendBlogEntry(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    deleteBlog(state, action) {
      const deletedBlogEntry = action.payload
      return state.filter((blog) => blog.id !== deletedBlogEntry.id)
    },
  },
})

export const { setBlogs, updateBlogs, appendBlogEntry, deleteBlog } =
  blogSlice.actions

export const createBlogEntry = (newBlogEntry) => {
  return async (dispatch) => {
    await blogService.create(newBlogEntry)
    const getAllBlogs = await blogService.getAll()
    dispatch(
      createNotification(
        `A new blog titled '${newBlogEntry.title}' created`,
        'info',
        5
      )
    )
    dispatch(setBlogs(getAllBlogs))
  }
}

export const deleteBlogEntry = (blogEntry) => {
  return async (dispatch) => {
    await blogService.remove(blogEntry.id)
    dispatch(deleteBlog(blogEntry))
    dispatch(createNotification(`Blog ${blogEntry.title} removed`, 'info', 5))
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, blog)
    const getAllBlogs = await blogService.getAll()
    dispatch(setBlogs(getAllBlogs))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
