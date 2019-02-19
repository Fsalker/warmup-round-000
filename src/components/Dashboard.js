import React from "react"
import {connect} from "react-redux"
import DashboardLoggedIn from "./DashboardLoggedIn"
import DashboardLoggedOut from "./DashboardLoggedOut"
import {updateJwt} from "../actions";

let component = ({dispatch, jwt}) => {
  return (
    <div>
      <h1>Hey! This is the Dashboard</h1>
      <input placeholder="(Session)" onChange={e => dispatch(updateJwt(e.target.value))}/><br/><br/>
      {jwt && <DashboardLoggedIn/>}
      {!jwt && <DashboardLoggedOut/>}
      {jwt}
    </div>
  )
}

let mapStateToProps = state => ({
  jwt: state.session.jwt
})

export default connect(mapStateToProps)(component)