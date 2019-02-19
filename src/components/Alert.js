import React from "react"
import {connect} from "react-redux"

let component = ({dispatch, message}) => {
  return (
    <div style={{color: "red"}}>
      {message ? "*"+message : ""}
    </div>
  )
}

let mapStateToProps = state => ({

})

export default connect(mapStateToProps)(component)