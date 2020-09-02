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
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { PollSharp } from '@material-ui/icons'
import { Search } from '@material-ui/icons'
import { AccountCircle } from '@material-ui/icons'
import './Header.css'
import API from '../../utils/API';

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
  },
  profileButton: {
    color:"#c2c2c2",
    "text-transform":"none",
    fontSize: '17px'
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
      loginUser: {
        email: "",
        emailRequiredError: false,
        emailInvalidError: false,
        password: "",
        passwordRequiredError: false,
      },
      signupUser: {
        name: "",
        nameRequiredError: false,
        email: "",
        emailRequiredError: false,
        emailInvalidError: false,
        password: "",
        passwordRequiredError: false
      },
      isProfileMenuOpen: false,
      profileMenuAnchorElement: null,
    }
  }

  closeModalHandler = () => {
    this.setState({ 
      isModalOpen: false,
      modalTabValue: 0,
      loginUser: {
        email: "",
        emailRequiredError: false,
        emailInvalidError: false,
        password: "",
        passwordRequiredError: false,
      },
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

  profileButtonClickHandler = (event) => {
    this.setState({ 
      profileMenuAnchorElement: event.currentTarget,
      isProfileMenuOpen: true
    });
  };

  closeProfileMenuHandler = () => {
    this.setState({
      profileMenuAnchorElement: null,
      isProfileMenuOpen: false
    })
  }

  logoutMenuItemHandler = () => {
    const url = this.props.baseUrl + "/session";
    API.postNewTask(url, null, 'DELETE')
    .then(response => {
      window.location.reload();
    })
    this.closeProfileMenuHandler();
  }
    
  loginEmailInputHandler = ({ target: { value } }) => {
    this.setState(oldState => ({
      loginUser: {
        ...oldState.loginUser,
        email: value
      }
    }));
  }
  
  loginPasswordInputHandler = ({ target: { value } }) => {
    this.setState(oldState => ({
      loginUser: {
        ...oldState.loginUser,
        password: value
      }
    }));
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

    API.postNewTask(url, { user: this.state.signupUser }, 'POST')
    .then(response => {
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
    })
    .catch(error => {
      if (error.json) {
        error.json().then(json => {
          alert(json.message);
        })
      }
    })
  }

  validateLoginForm = () => {
    let isEmailMissing = false;
    let isEmailInvalid = false;
    let isPasswordMissing = false;

    const { loginUser } = this.state;

    if (loginUser.email === "") {
      isEmailMissing = true;
    } else if (!(EMAIL_REGEX.test(loginUser.email))) {
      isEmailInvalid = true;
    }

    if (loginUser.password === "") {
      isPasswordMissing = true;
    }

    this.setState(oldState => ({
      loginUser: {
        ...oldState.loginUser,
        emailRequiredError: isEmailMissing,
        emailInvalidError: isEmailInvalid,
        passwordRequiredError: isPasswordMissing
      }
    }))

    return (!isEmailMissing && !isEmailInvalid && !isPasswordMissing);
}

  loginSubmitClickHandler = () => {
    if (!(this.validateLoginForm())) return;

    const url = this.props.baseUrl + "/session";

    API.postNewTask(url, { user: this.state.loginUser }, 'POST')
    .then(response => {
      const { name } = response.user;
      window.location.reload();
    })
    .catch(error => {
      if (error.json) {
        error.json().then(json => {
          alert(json.message);
        })
      }
    })
  }

  render() {
    const { classes, currentUser } = this.props;
    let menuButton = null;
    if (currentUser) {
      menuButton = (
        <Button 
          classes={{root: classes.profileButton }}
          size="large"
          variant="text"
          onClick={this.profileButtonClickHandler}>
          <AccountCircle className="profile-button-icon" htmlColor="#c2c2c2"/>
          {currentUser.name}
        </Button>
      )
    } else {
      menuButton = (
        <Button 
          variant="contained"
          color="default"
          onClick={this.loginButtonClickHandler}>
          <AccountCircle className="login-button-icon"/>
          LOGIN
        </Button>
      )
    }
    let modalContent = null;
    if (this.state.modalTabValue == 0) {
      const { loginUser } = this.state;
      modalContent = 
        <Fragment>
          <br />
          <FormControl fullWidth required>
            <InputLabel>Email</InputLabel>
            <Input
              className="input-fields"
              type="tel"
              value={loginUser.email}
              onChange={this.loginEmailInputHandler}/>
            <FormHelperText className={loginUser.emailRequiredError ? "dispBlock" : "dispNone"}>
              <span className='red'>required</span>
            </FormHelperText>
            <FormHelperText className={loginUser.emailInvalidError ? "dispBlock" : "dispNone"}>
              <span className='red'>Invalid Email</span>
            </FormHelperText>
          </FormControl>
          <br /><br />
          <FormControl fullWidth required>
            <InputLabel>Password</InputLabel>
            <Input
              className="input-fields"
              type="password"
              value={loginUser.password}
              onChange={this.loginPasswordInputHandler} />
            <FormHelperText className={loginUser.passwordRequiredError ? "dispBlock" : "dispNone"}>
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
          {menuButton}
          <Menu 
            anchorEl={this.state.profileMenuAnchorElement}
            getContentAnchorEl={null}
            anchorOrigin={{ 
              vertical: "bottom",
              horizontal: "center"
            }}
            open={this.state.isProfileMenuOpen}
            onClose={this.closeProfileMenuHandler}>
            <MenuItem>
              Create Poll
            </MenuItem>
            <MenuItem onClick={this.logoutMenuItemHandler}>
              Logout
            </MenuItem>
          </Menu>
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