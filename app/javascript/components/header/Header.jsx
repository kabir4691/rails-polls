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
      signupUser: {
        name: "",
        nameRequiredError: false,
        email: "",
        emailRequiredError: false,
        emailInvalidError: false,
        password: "",
        passwordRequiredError: false
      },
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
      signupUser: {
        name: "",
        nameRequiredError: false,
        email: "",
        emailRequiredError: false,
        emailInvalidError: false,
        password: "",
        passwordRequiredError: false
      },
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

  signupNameInputHandler = ({ target: { value } }) => {
    this.setState(oldState => ({
      signupUser: {
        ...oldState.signupUser,
        name: value
      }
    }));
  }
  
  signupEmailInputHandler = ({ target: { value } }) => {
    this.setState(oldState => ({
      signupUser: {
        ...oldState.signupUser,
        email: value
      }
    }));
  }
  
  signupPasswordInputHandler = ({ target: { value } }) => {
    this.setState(oldState => ({
      signupUser: {
        ...oldState.signupUser,
        password: value
      }
    }));
  }

  validateSignupForm = () => {
    let isNameMissing = false;
    let isEmailMissing = false;
    let isEmailInvalid = false;
    let isPasswordMissing = false;

    const { signupUser } = this.state;

    if (signupUser.name === "") {
      isNameMissing = true;
    }

    if (signupUser.email === "") {
      isEmailMissing = true;
    } else if (!(EMAIL_REGEX.test(signupUser.email))) {
      isEmailInvalid = true;
    }
    
    if (signupUser.password === "") {
      isPasswordMissing = true;
    } 

    this.setState(oldState => ({
      signupUser: {
        ...oldState.signupUser,
        emailRequiredError: isEmailMissing,
        emailInvalidError: isEmailInvalid,
        passwordRequiredError: isPasswordMissing
      }
    }))

    return (!isNameMissing && !isEmailMissing && !isEmailInvalid && !isPasswordMissing);
  }

  signupSubmitClickHandler = () => {
    if (!(this.validateSignupForm())) return;

    const url = this.props.baseUrl + "/users";
    const requestBody = JSON.stringify({user: this.state.signupUser});

    fetch(url, { 
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: requestBody
    })
    .then(async response => {
      if (response.ok) {
        alert("User successfully registered");
        this.setState({
          modalTabValue: 0,
          signupUser: {
            name: "",
            nameRequiredError: false,
            email: "",
            emailRequiredError: false,
            emailInvalidError: false,
            password: "",
            passwordRequiredError: false
          }
        })
      } else {
        const responseBody = await response.json();
        alert(responseBody.error_message);
      }
    })
    .catch(err => console.log({err}));
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

    const url = this.props.baseUrl + "users";
    const requestBody = JSON.stringify({ 
      "email": this.state.loginEmail,
      "password": this.state.loginPassword
    });

    fetch(url, { 
      method: 'POST',
      body: requestBody
    })
    .then(async response => {
      console.log({response});
      if (response.ok) {
        const responseBody = await response.json();
        console.log({responseBody});
      } else if (response.status === 400) {
        const json = JSON.parse(response.body);
        if (json.code === 'SGR-001') {
          this.setState({
            signupContactNumberRegisteredError: true
          })
        }
      }
    })
    .catch(err => console.log({err}));
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
      const { signupUser } = this.state;
      modalContent = 
        <Fragment>
          <br />
          <FormControl fullWidth required>
            <InputLabel>Name</InputLabel>
            <Input
              className="input-fields"
              type="text"
              value={signupUser.name}
              onChange={this.signupNameInputHandler} />
            <FormHelperText className={signupUser.nameRequiredError ? "dispBlock" : "dispNone"}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br/><br/>
          <FormControl fullWidth required>
            <InputLabel>Email</InputLabel>
            <Input 
              className="input-fields"
              type="email"
              value={signupUser.email}
              onChange={this.signupEmailInputHandler} />
            <FormHelperText className={signupUser.emailRequiredError ? "dispBlock" : "dispNone"}>
              <span className="red">required</span>
            </FormHelperText>
            <FormHelperText className={signupUser.emailInvalidError ? "dispBlock" : "dispNone"}>
              <span className="red">Invalid Email</span>
            </FormHelperText>
          </FormControl>
          <br/><br/>
          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <Input
              className="input-fields"
              type="password"
              value={signupUser.password}
              onChange={this.signupPasswordInputHandler} />
            <FormHelperText className={signupUser.passwordRequiredError ? "dispBlock" : "dispNone"}>
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