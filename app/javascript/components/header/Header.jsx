import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Modal from 'react-modal';
import { Input } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
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

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const EMAIL_REGEX = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w+)+$/;

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalTabValue: 0,
      loginEmail: "",
      loginEmailRequiredError: false,
      loginEmailInvalidError: false,
      loginPassword: "",
      loginPasswordRequiredError: false,
      signupName: "",
      signupNameRequiredError: false,
      signupEmail: "",
      signupEmailRequiredError: false,
      signupEmailInvalidError: false,
      signupPassword: "",
      signupPasswordRequiredError: false
    }
  }

  closeModalHandler = () => {
    this.setState({ 
      isModalOpen: false,
      modalTabValue: 0,
      loginEmail: "",
      loginEmailRequiredError: false,
      loginEmailInvalidError: false,
      loginPassword: "",
      loginPasswordRequiredError: false,
      signupName: "",
      signupNameRequiredError: false,
      signupEmail: "",
      signupEmailRequiredError: false,
      signupEmailInvalidError: false,
      signupPassword: "",
      signupPasswordRequiredError: false
     })
  }

  modalTabChangeHandler = (event, value) => {
    this.setState({ modalTabValue: value });
  }

  loginButtonClickHandler = () => {
    this.setState({ isModalOpen: true });
  }
    
  loginEmailInputHandler = (event) => {
    this.setState({ loginEmail: event.target.value });
  }
  
  loginPasswordInputHandler = (event) => {
    this.setState({ loginPassword: event.target.value });
  }

  signupNameInputHandler = (event) => {
    this.setState({ signupName: event.target.value });
  }
  
  signupEmailInputHandler = (event) => {
    this.setState({ signupEmail: event.target.value });
  }
  
  signupPasswordInputHandler = (event) => {
    this.setState({ signupPassword: event.target.value });
  }

  validateSignupForm = () => {
    let isNameMissing = false;
    let isEmailMissing = false;
    let isEmailInvalid = false;
    let isPasswordMissing = false;

    if (this.state.signupName === "") {
      isNameMissing = true;
    }

    if (this.state.signupEmail === "") {
      isEmailMissing = true;
    } else if (!(EMAIL_REGEX.test(this.state.signupEmail))) {
      isEmailInvalid = true;
    }
    
    if (this.state.signupPassword === "") {
      isPasswordMissing = true;
    } 

    this.setState({
        signupNameRequiredError: isNameMissing,
        signupEmailRequiredError: isEmailMissing,
        signupEmailInvalidError: isEmailInvalid,
        signupPasswordRequiredError: isPasswordMissing
    })

    return (!isNameMissing && !isEmailMissing && !isEmailInvalid && !isPasswordMissing);
  }

  signupSubmitClickHandler = () => {
    if (!(this.validateSignupForm())) return;
  }

  validateLoginForm = () => {
    let isEmailMissing = false;
    let isEmailInvalid = false;
    let isPasswordMissing = false;

    if (this.state.loginEmail === "") {
      isEmailMissing = true;
    } else if (!(EMAIL_REGEX.test(this.state.loginEmail))) {
      isEmailInvalid = true;
    }

    if (this.state.loginPassword === "") {
      isPasswordMissing = true;
    }

    this.setState({
      loginEmailRequiredError: isEmailMissing,
      loginEmailInvalidError: isEmailInvalid,
      loginPasswordRequiredError: isPasswordMissing
    })

    return (!isEmailMissing && !isEmailInvalid && !isPasswordMissing);
}

  loginSubmitClickHandler = () => {
    if (!(this.validateLoginForm())) return;
  }

  render() {
    const { classes } = this.props;
    let modalContent = null;
    if (this.state.modalTabValue == 0) {
      modalContent = 
        <Fragment>
          <br />
          <FormControl fullWidth required>
            <InputLabel>Email</InputLabel>
            <Input
              className="input-fields"
              type="tel"
              value={this.state.loginEmail}
              onChange={this.loginEmailInputHandler}/>
            <FormHelperText className={this.state.loginEmailRequiredError ? "dispBlock" : "dispNone"}>
              <span className='red'>required</span>
            </FormHelperText>
            <FormHelperText className={this.state.loginEmailInvalidError ? "dispBlock" : "dispNone"}>
              <span className='red'>Invalid Email</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <Input
              className="input-fields"
              type="password"
              value={this.state.loginPassword}
              onChange={this.loginPasswordInputHandler} />
            <FormHelperText className={this.state.loginPasswordRequiredError ? "dispBlock" : "dispNone"}>
              <span className='red'>required</span>
            </FormHelperText>
          </FormControl>
          <br/><br/><br/>
          <Button 
            variant="contained"
            color="primary"
            onClick={this.loginSubmitClickHandler}>
            LOGIN
          </Button>
        </Fragment>
    } else {
      modalContent = 
        <Fragment>
          <br />
          <FormControl fullWidth required>
            <InputLabel>Name</InputLabel>
            <Input
              className="input-fields"
              type="text"
              value={this.state.signupName}
              onChange={this.signupNameInputHandler} />
            <FormHelperText className={this.state.signupNameRequiredError ? "dispBlock" : "dispNone"}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br/><br/>
          <FormControl fullWidth required>
            <InputLabel>Email</InputLabel>
            <Input 
              className="input-fields"
              type="email"
              value={this.state.signupEmail}
              onChange={this.signupEmailInputHandler} />
            <FormHelperText className={this.state.signupEmailRequiredError ? "dispBlock" : "dispNone"}>
              <span className="red">required</span>
            </FormHelperText>
            <FormHelperText className={this.state.signupEmailInvalidError ? "dispBlock" : "dispNone"}>
              <span className="red">Invalid Email</span>
            </FormHelperText>
          </FormControl>
          <br/><br/>
          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <Input
              className="input-fields"
              type="password"
              value={this.state.signupPassword}
              onChange={this.signupPasswordInputHandler} />
            <FormHelperText className={this.state.signupPasswordRequiredError ? "dispBlock" : "dispNone"}>
                <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br/><br/><br/>
          <Button 
            variant="contained" 
            color="primary"
            onClick={this.signupSubmitClickHandler}>
            SIGNUP
          </Button>
        </Fragment>
    }
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
                input: classes.searchBarInput,
                underline: classes.searchBarUnderline
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Search htmlColor="white"/>
                </InputAdornment>
              }
              placeholder="Search by poll question"
            />
          </div>
          <Button 
            variant="contained"
            color="default"
            onClick={this.loginButtonClickHandler}>
            <AccountCircle className="login-button-icon"/>
            LOGIN
          </Button>
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModalHandler}
          style={modalStyle}>
          <Tabs
            value={this.state.modalTabValue}
            onChange={this.modalTabChangeHandler}>
            <Tab label="LOGIN" />
            <Tab label="SIGNUP" />
          </Tabs>
          <div className="modal-content">
            {modalContent}
          </div>
        </Modal>
      </Fragment>
    )
  }
}

export default withStyles(classes)(Header)