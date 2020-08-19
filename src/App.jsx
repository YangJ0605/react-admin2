import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './pages/login/login'
import Layout from './pages/layout/layout'


class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Layout}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App