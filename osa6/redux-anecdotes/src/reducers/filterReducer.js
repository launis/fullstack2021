export const setFilter = (data) => {
  return {
    type: 'SET_FILTER',
    data
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.data
  default:
    return state
  }
}

export default reducer