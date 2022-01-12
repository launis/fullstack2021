import { getId } from '../reducers/store'

export const createNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      text: content.text,
      type: content.type,
      id: getId()
    }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: {
      text: null,
      type: null,
      id: null
    }
  }
}

const reducer = (state = [], action) => {


  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return [...state, action.data]
  case 'HIDE_NOTIFICATION':
    return []
  default:
    return state
  }
}

export default reducer