import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
// import { createNotification } from './notificationReducer'

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

// export const createBlogEntry = (newBlogEntry) => async (dispatch) => {
//   try {
//     dispatch({
//       type: appendBlogEntry,
//       data: await blogService.create(newBlogEntry),
//     })

//     dispatch(
//       createNotification(`A new blog ${newBlogEntry.title} created`, 'info', 5)
//     )
//   } catch (error) {
//     dispatch(createNotification(error.message, 'alert', 5))
//   }
// }

export const createBlogEntry = (newBlogEntry) => {
  return async (dispatch) => {
    const createdEntry = await blogService.create(newBlogEntry)
    dispatch(appendBlogEntry(createdEntry))
  }
}

export const deleteBlogEntry = (blogEntry) => {
  // console.log(`running 'deleteBlogEntry': ${blogEntry.title}, ${blogEntry.id}`)
  return async (dispatch) => {
    const blogToDelete = await blogService.remove(blogEntry.id)
    dispatch(deleteBlog(blogToDelete))
  }
}

export const addLike = (blog) => {
  // console.log(`liking blog ${blog.title}`)
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id)
    dispatch(updateBlogs(updatedBlog))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
