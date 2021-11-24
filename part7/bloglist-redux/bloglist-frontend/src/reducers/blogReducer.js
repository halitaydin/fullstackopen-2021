import blogService from '../services/blogs'
import { notify } from './notificationReducer'
import { enotify } from './errorNotificationReducer'
import { initializeUsers } from './userReducers'
import { loadingAction } from './loadingReducer'

export const like = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getAll()
    const newObject = blog.find(element => element.id === id)
    const newLike = await blogService.update(id,{
      likes: newObject.likes + 1,
    })
    dispatch(initializeBlogs())
    dispatch({
      type: 'LIKE',
      data: newLike,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const refreshedBlogs = await blogService.getAll()
    dispatch(initializeUsers())
    dispatch({
      type: 'REMOVE',
      data: refreshedBlogs
    })
  }
}

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(data)
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(notify(`a new blog "${newBlog.title}" created by ${newBlog.author}`, 5000))
    } catch (error) {
      dispatch(enotify(`${error.response.data.error}`, 5000))
    }

  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch(loadingAction(true))
    const blogs = await blogService.getAll()
    dispatch(loadingAction(false))
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.createComments(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: updatedBlog,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    return state.map((blog) =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE':
    return action.data
  case 'NEW_COMMENT':
    return state.map((item) =>
      item.id !== action.data.id ? item : action.data
    )
  default:
    return state
  }
}

export default blogReducer
