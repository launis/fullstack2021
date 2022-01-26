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

export const update = (id, content) => {

  return async dispatch => {
    try {
      const data = await service.update(id, content)
      dispatch({
        type: 'UPDATE BLOG',
        data
      })
      dispatch(setNotification({ text: `Update ${id}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}

export const initialize = () => {

  return async dispatch => {
    try {
      const data = await service.getAll()
      dispatch({
        type: 'INIT BLOG',
        data
      })
    }
    catch (exception) {
      try {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setNotification({ text: 'Login credentials not anymore valid, refress and login', type: 'ERROR' }, 99))
      }
      catch (exception)  {
        dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
      }
    }
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
  case 'NEW BLOG':
    return [...state, action.data]
  case 'DELETE BLOG':
    return (state.filter((s) => s.id !== action.data.id))
  case 'INIT BLOG':
    return action.data
  case 'UPDATE BLOG':
    return (state.map((s => (s.id === action.data.id ? action.data : s))))
  default:
    return state
  }
}

export default reducer