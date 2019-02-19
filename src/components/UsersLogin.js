import React from "react"
import {connect} from "react-redux"
import UsersCreate from "./UsersCreate"
import UsersLogin from "./UsersLogin"
import Alert from "./Alert"
import {
  updateUsersCreateUsername,
  updateUsersCreatePassword,
  updateUsersCreateBiography,
  updateUsersCreateAlert,
  updateJwt
} from "../actions";
import {API_HOST} from "../config";

let component = ({dispatch, alertMessage, username, password, biography}) => {
  let register = async() => {
    let query = `mutation
    {
      createUser(input: {username: "${username}", password: "${password}", bio: "${biography}"})
      {
        jwt
      }
    }`
    let r = await fetch(API_HOST, {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({query})})
    r = await r.json()
    console.log(r)
    if(r.errors) {
      console.log(r.errors)
      let errorMessage = r.errors[0].message
      return dispatch(updateUsersCreateAlert(errorMessage))
    }

    dispatch(updateUsersCreateAlert(""))
    localStorage.setItem("jwt", r.data.createUser.jwt)
    dispatch(updateJwt(r.data.createUser.jwt))
  }

  return (
    <div>
      <h2>Register</h2>
      <Alert message={alertMessage}/>
      <p>Username</p><input placeholder="Username..." value={username} onChange={e => dispatch(updateUsersCreateUsername(e.target.value))}/>
      <p>Password</p><input type="password" placeholder="Password..." value={password} onChange={e => dispatch(updateUsersCreatePassword(e.target.value))}/>
      <p>Bio</p><textarea placeholder="Biography" value={biography} onChange={e => dispatch(updateUsersCreateBiography(e.target.value))}/><br/>
      <button onClick={register}>Register</button>
    </div>
  )
}

let mapStateToProps = state => ({
  username: state.users.create.username,
  password: state.users.create.password,
  biography: state.users.create.biography,
  alertMessage: state.users.create.alert
})

export default connect(mapStateToProps)(component)