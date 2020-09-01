import React, { Component, Fragment } from 'react';
import './Home.css';
import Header from '../header/Header'

class Home extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Fragment>
        <Header baseUrl="http://localhost:3000" currentUser={this.props.currentUser}/>
      </Fragment>
    )
  }
}

export default Home;