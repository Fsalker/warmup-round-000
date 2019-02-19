import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import {createStore} from "redux"
import mainReducer from "./reducers"
import {Provider} from "react-redux"
import {updateJwt} from "./actions";
import {API_HOST} from "./config";

let main = async() => {
  // Store (initialise it)
  let store = createStore(mainReducer)
  let logger = () => console.log(store.getState())
  store.subscribe(logger)

  // Session (validate & store it)
  let jwt = localStorage.getItem("jwt")
  let query = `query{
    isMySessionValid(auth: {jwt: "${jwt}"})
   }`
  let body = JSON.stringify({query})
  let r = await fetch(API_HOST, {method: "POST", headers: {"content-type": "application/json"}, body})
  r = await r.json()
  if(r.errors)
    jwt = null
  store.dispatch(updateJwt(jwt))

  // Render
  ReactDOM.render(<Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
}

main()