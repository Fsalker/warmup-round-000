import {combineReducers} from "redux"
import session from "./session"
import users from "./users"
import boards from "./boards"

export default combineReducers({
  session,
  users,
  boards,
})