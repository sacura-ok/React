import React, { Component } from 'react';
import RequestService from '../../services/RequestService';
import './RegistrationForm.css';

export default class RegistrationForm extends Component {

  requestService = new RequestService();

  state = {
    username: '',
    password: '',
    message: '',
    success: '',
    token: '',
    showCatalog: false,
    formInOut: null
  }

  registerUser = (e) =>  {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      this.requestService
        .registerUser({username:this.state.username, password:this.state.password},this.state.token)
          .then((res) => {
              this.setState({
                message: res.success?'You are registered!':res.message,
                success: res.success,
                token: res.token,
                formInOut: true
              });
            this.props.onClickButtonRegister(this.state.showCatalog, this.state.token);
          });
    }else {
        this.setState({
          message: 'Username or password invalid!',
        });
    }
  }
  signIn = (e) =>  {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      this.requestService
        .loginUser({username:this.state.username, password:this.state.password},this.state.token)
          .then((res) => {
              this.setState({
                message: res.success?'You are signed in!':res.message,
                success: res.success,
                token: res.token,
                formInOut: true
              });
            this.props.onClickButtonSignIn(this.state.showCatalog, this.state.token);
          });
    }else {
      this.setState({
        message: 'Username or password invalid!',
      });
    }
  }

  signOut = (e) =>  {
    e.preventDefault();
    this.setState({
      message: '',
      username: '',
      password: '',
      token: '',
      text:'',
      formInOut: false
    });
    this.props.onClickButtonSignOut(false);
  }

  onSubmit = (e) =>  {
    e.preventDefault();
  }

  userNameChange = (e) => {
    this.setState({username: e.target.value});
  }

  passwordChange = (e) => {
    this.setState({password: e.target.value});
  }

  render() {
    const getMessage = <div className="registration-form__message">{this.state.message}</div>;
    const formSignIn = (
      <form className="registration-form" onSubmit={this.onSubmit}>
        <input className="registration-form__item registration-form__input"
          type="text" placeholder="Your name *" value={this.state.username}
          onChange={this.userNameChange} />
        <input className="registration-form__item registration-form__input"
          type="password" placeholder="Enter Password *" value={this.state.password}
          onChange={this.passwordChange} />
        <div className="registration-form__block">
          <button className="registration-form__item registration-form__button"
            name="signin" onClick={this.signIn}>Sign in</button>
          <button className="registration-form__item registration-form__button"
            name="register" onClick={this.registerUser}>Register</button>
        </div>
        <button className="view-catalog"
          onClick={() => this.props.onClickButtonViewCatalog(true)}>View Catalog</button>
      </form>
      );

    const formSignOut = <div className="registration-form__sign-out">
                          <div className="registration-form__user">Welcome, {this.state.username}</div>
                          <button className="registration-form__button-out"
                                  onClick={this.signOut}>Sign out</button>
                        </div>;
    return (
      <div className="authorization">
          {this.state.formInOut?formSignOut:formSignIn}
          {this.state.message?getMessage:null}
      </div>
    );
  }
}
