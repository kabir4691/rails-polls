import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Error404 from './error404/Error404'
import Home from './home/Home'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home currentUser={this.props.currentUser}/>
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
