import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from './MainPage'

class App extends Component {
  render() {
    return (
      <Router>
      		<Switch>
            <Route path="/" component={MainPage}/>
      		</Switch>
    	</Router>
    )
  }
}

export default App
