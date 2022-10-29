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
    // appendBlogEntry(state, action) {
    //   state.push(action.payload)
    // },
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

// export const deleteBlogEntry = (blogEntry) => async (dispatch) => {
//   try {
//     await blogService.remove(blogEntry.id)
//     dispatch({
//       type: deleteBlog,
//       data: blogEntry,
//     })
//     dispatch(createNotification('Blog removed', 'info', 5))
//   } catch (error) {
//     dispatch(
//       createNotification(
//         `Removing blog, an error occured: ${error.message}`,
//         'alert',
//         5
//       )
//     )
//   }
// }

export const deleteBlogEntry = (blogEntry) => {
  // console.log(`running 'deleteBlogEntry': ${blogEntry.title}, ${blogEntry.id}`)
  return async (dispatch) => {
    await blogService.remove(blogEntry.id)
    dispatch(deleteBlog(blogEntry))
    dispatch(createNotification(`Blog ${blogEntry.title} removed`, 'info', 5))
  }
}

export const addLike = (blog) => {
  // console.log(`liking blog ${blog.title}`)
  return async (dispatch) => {
    // const updatedBlog = await blogService.update(blog.id, blog)
    // dispatch(updateBlogs(updatedBlog))
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
