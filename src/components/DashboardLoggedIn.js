import React from "react"
import {connect} from "react-redux"
import Logout from "./UsersLogout"

let component = ({dispatch}) => {
  return (
    <div>
      <h3>Logged in!</h3>
      <Logout/>
    </div>
  )
}

let mapStateToProps = state => ({

})

export default connect(mapStateToProps)(component)