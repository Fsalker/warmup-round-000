import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import {createStore} from "redux"
import mainReducer from "./reducers"
import {Provider} from "react-redux"
import {updateSession} from "./actions";

let main = () => {
  // Store (initialise it)
  let store = createStore(mainReducer)
  let logger = () => console.log(store.getState())
  store.subscribe(logger)

  // Session (store it)
  store.dispatch(updateSession(localStorage.getItem("session")))

  // Render
  ReactDOM.render(<Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
}

main()