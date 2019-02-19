import React from "react"
import {connect} from "react-redux"
import {updateJwt} from "../actions";

let component = ({dispatch}) => {
  let logOut = () => {
    localStorage.removeItem("jwt")
    dispatch(updateJwt(null))
  }

  return (
    <div>
      <h2>Log out</h2>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}

let mapStateToProps = state => ({
})

export default connect(mapStateToProps)(component)