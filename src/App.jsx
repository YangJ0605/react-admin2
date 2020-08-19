import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './pages/login/login'
import Home from './pages/home/home'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Home}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App