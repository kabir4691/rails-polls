import React, { Component, Fragment } from 'react';
import './Home.css';
import Header from '../header/Header'

class Home extends Component {
  
  render() {
    return (
      <Fragment>
        <Header baseUrl="http://localhost:3000"/>
      </Fragment>
    )
  }
}

export default Home;