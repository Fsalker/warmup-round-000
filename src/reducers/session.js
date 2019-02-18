let initialState = {
  value: null
}

export default(state = initialState, action) => {
  switch(action.type){
    case "UPDATE_SESSION":
      return {...state, value: action.session}
    default:
      return state
  }
}