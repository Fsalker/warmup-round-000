let initialState = {
  jwt: null
}

export default(state = initialState, action) => {
  switch(action.type){
    case "UPDATE_SESSION":
      return {...state, jwt: action.jwt}
    default:
      return state
  }
}