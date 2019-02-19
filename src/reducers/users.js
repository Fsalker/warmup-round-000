let initialState = {
  create: {
    alert: "",
    username: "",
    password: "",
    biography: ""
  }
}

export default(state = initialState, action) => {
  switch(action.type){
    case "UPDATE_USERS_CREATE_USERNAME":
      return {...state, create: {...state.create, username: action.username}}
    case "UPDATE_USERS_CREATE_PASSWORD":
      return {...state, create: {...state.create, password: action.password}}
    case "UPDATE_USERS_CREATE_BIOGRAPHY":
      console.log("Updating biography...")
      return {...state, create: {...state.create, biography: action.biography}}
    case "UPDATE_USERS_CREATE_ALERT":
      return {...state, create: {...state.create, alert: action.alert}}
    default:
      return state
  }
}