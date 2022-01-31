import service from '../services/users'
import { setNotification } from '../reducers/notificationReducer'
const notfication_wait = 3

export const create = (content) => {

  return async dispatch => {
    try {
      const data = await service.create(content)
      dispatch({
        type: 'NEW USER',
        data
      })
      dispatch(setNotification({ text: `Create ${data.id}`, type:'DATA' }, notfication_wait))
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
        type: 'UPDATE USER',
        data
      })
      dispatch(setNotification({ text: `Update ${id}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}


export const initializeUsers = () => {
  return async dispatch => {
    try {
      const data = await service.getAll()
      dispatch({
        type: 'INIT USER',
        data
      })
      dispatch(setNotification({ text: 'Initialize users', type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }
}


const reducer = (state = [], action) => {

  switch(action.type) {
  case 'NEW USER':
    return [...state, action.data]
  case 'INIT USER':
    return action.data
  case 'UPDATE USER':
    return (state.map((s => (s.id === action.data.id ? action.data : s))))
  default:
    return state
  }
}

export default reducer