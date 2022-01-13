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
        type: content.type
      },
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state', state)
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return []
  default:
    return state
  }
}

export default reducer