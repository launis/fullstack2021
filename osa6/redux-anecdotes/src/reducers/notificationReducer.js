import { getId } from '../reducers/store'

let timeId = 0

export const setNotification = (content, time) => {
  return async (dispatch) => {
    clearTimeout(timeId)
    timeId = setTimeout(
      () =>
        dispatch({
          type: 'HIDE_NOTIFICATION'
        }),
      time * 1000
    )
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        text: content.text,
        type: content.type,
        id: getId()
      },
    })
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