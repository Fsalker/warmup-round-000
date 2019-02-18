import React from "react"
import {connect} from "react-redux"

let App = (props) => {
  return (
    <div>
      <h2>Hey there!</h2>
      {props.session}
    </div>
  )
}

let mapStateToProps = state => ({
  session: state.session.value
})

export default connect(mapStateToProps)(App)