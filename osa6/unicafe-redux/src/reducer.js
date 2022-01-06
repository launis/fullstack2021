const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
  case 'GOOD':
    initialState.good += 1
    return  initialState
  case 'OK':
    initialState.ok += 1
    return  initialState
  case 'BAD':
    initialState.bad += 1
    return  initialState
  case 'ZERO':
    initialState.good += 1
    return  {
      good: 0,
      ok: 0,
      bad: 0
    }
  default: return state
  }

}

export default counterReducer