import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Input } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { PollSharp } from '@material-ui/icons'
import { Search } from '@material-ui/icons'
import { AccountCircle } from '@material-ui/icons'
import './Header.css'

const classes = theme => ({
  searchBarInput: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white"
    },
    color: "white"
  },
  searchBarUnderline: {
    '&:before': {
      borderBottom: '1px solid black',
    },
    '&:after': {
      borderBottom: '1px solid white',
    }
  }
})

class Header extends Component {

  render() {
    return (
      <Fragment>
        <header className="app-header">
          <Link to="/">
            <PollSharp fontSize="large" htmlColor="white"/>
          </Link>
          <div className="search-container">
            <Input 
              fullWidth
              classes={{ 
                input: this.props.classes.searchBarInput,
                underline: this.props.classes.searchBarUnderline
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Search htmlColor="white"/>
                </InputAdornment>
              }
              placeholder="Search by poll question"
            />
          </div>
          <Button variant="contained" color="default">
            <AccountCircle className="login-button-icon"/>
            LOGIN
          </Button>
        </header>
      </Fragment>
    )
  }
}

export default withStyles(classes)(Header)