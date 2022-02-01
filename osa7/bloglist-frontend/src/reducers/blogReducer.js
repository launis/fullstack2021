import service from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const notfication_wait = 3

export const create = (content) => {

  return async dispatch => {
    try {
      const data = await service.create(content)
      dispatch({
        type: 'NEW BLOG',
        data
      })
      dispatch(setNotification({ text: `Create ${data.id}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}

export const del = (id) => {

  return async dispatch => {
    try {
      await service.del(id)
      const data = { id }
      dispatch({
        type: 'DELETE BLOG',
        data
      })
      dispatch(setNotification({ text: `Delete ${id}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}

export const addLike = (id) => {

  return async dispatch => {
    try {
      const blog = await service.get(id)
      const content = { likes : blog.likes + 1 }
      await service.update(id, content)
      const data = { id }
      dispatch({
        type: 'LIKE BLOG',
        data
      })
      dispatch(setNotification({ text: `Update ${id}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}

export const addComment = (id, content) => {

  return async dispatch => {
    try {
      const blog = await service.get(id)
      const data = { id, comments: [...blog.comments, content] }
      await service.update(id, data)
      dispatch({
        type: 'COMMENT BLOG',
        data
      })
      dispatch(setNotification({ text: `Update ${id}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}



export const initializeBlogs = () => {

  return async dispatch => {
    try {
      const data = await service.getAll()
      dispatch({
        type: 'INIT BLOG',
        data
      })
      dispatch(setNotification({ text: 'Initialize blogs', type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      try {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(emptyBlogs())
        dispatch(setNotification({ text: 'Token expired, refress', type: 'ERROR' }, notfication_wait))
      }
      catch (exception)  {
        dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
      }
    }
  }
}

export const emptyBlogs = () => {

  return async dispatch => {
    try {
      dispatch({ type: 'EMPTY BLOG' })
      dispatch(setNotification({ text: 'Empty blogs', type:'DATA' }, notfication_wait))
    }
    catch (exception)  {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}

const initialState = []
const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NEW BLOG':
    return [...state, action.data]
  case 'DELETE BLOG':
    return (state.filter((s) => s.id !== action.data.id))
  case 'INIT BLOG':
    return action.data
  case 'EMPTY BLOG':
    state = initialState
    return state

  case 'COMMENT BLOG':
  {
    const currentBlog = state.find((blog) => blog.id === action.data.id)
    const updatedBlog = { ...currentBlog, comments: action.data.comments, }
    return state.map((blog) => (blog.id !== action.data.id ? blog : updatedBlog))
  }
  case 'LIKE BLOG':
  {
    const currentBlog = state.find((blog) => blog.id === action.data.id)
    const updatedBlog = { ...currentBlog, likes: currentBlog.likes + 1, }
    return state.map((blog) => (blog.id !== action.data.id ? blog : updatedBlog))
  }
  default:
    return state
  }
}

export default reducer