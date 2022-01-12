export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    content
  }
}

const initialState = { content: '' }

const reducer = (state = initialState, action) => {

  switch(action.type){
  case 'SET_FILTER': {
    return {
      ...state,
      content: action.content
    }
  }
  default:
    return state
  }

}


export default reducer