import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

import App from './App'

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')
  )