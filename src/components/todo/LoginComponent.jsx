import AuthenticationService from './AuthenticationService.js'
import React, { Component } from 'react';

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: 'in28minutes',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false
    }
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    )
  }

  loginClicked = () => {
    // if (this.state.username === 'in28minutes' && this.state.password === 'dummy') {
    //   AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
    //   this.props.history.push(`/welcome/${this.state.username}`)
    //   // this.setState({
    //   //   showSuccessMessage: true,
    //   //   hasLoginFailed: false
    //   // })
    // } else {
    //   this.setState({
    //     showSuccessMessage: false,
    //     hasLoginFailed: true
    //   })
    // }

    // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
    //   .then(
    //     () => {
    //       AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
    //       this.props.history.push(`/welcome/${this.state.username}`)
    //     }
    //   ).catch(
    //     () => {
    //       this.setState({
    //         showSuccessMessage: false,
    //         hasLoginFailed: true
    //       })
    //     }
    //   )
    AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
      .then(
        (response) => {
          AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
          this.props.history.push(`/welcome/${this.state.username}`)
        }
      ).catch(
        () => {
          this.setState({
            showSuccessMessage: false,
            hasLoginFailed: true
          })
        }
      )

  }


  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
          {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
          {/*<ShowLoginSuccessful showSuccessMessage={this.state.showSuccessMessage} />*/}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
        </div>
      </div>
    );
  }
}

export default LoginComponent