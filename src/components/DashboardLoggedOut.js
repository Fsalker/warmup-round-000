import React from "react"
import {connect} from "react-redux"
import UsersCreate from "./UsersCreate"
import UsersLogin from "./UsersLogin"

let component = ({dispatch}) => {
  return (
    <div>
      {null && <UsersCreate/>}
      <UsersLogin/>
    </div>
  )
}

let mapStateToProps = state => ({

})

export default connect(mapStateToProps)(component)