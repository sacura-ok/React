import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import Catalog from './Catalog';
import './App.css';

export default class App extends Component {
  state = {
    showCatalog: false,
    token: ''
  }

  onClickRegister = (showCatalog, token)=>{
    this.setState({
        showCatalog: showCatalog,
        token: token
      })
  };

  onClickSignIn = (showCatalog, token)=>{
    this.setState({
        showCatalog: showCatalog,
        token: token
      })
  };

  onClickSignOut = (showCatalog, token)=>{
    this.setState({
      showCatalog: showCatalog,
      token: ''
    })
  };

  onClickViewCatalog = (showCatalog)=>{
    this.setState({
        showCatalog: showCatalog,
        token: ''
      })
  };

  render(){
    return (
      <div className="wrapper">
        <RegistrationForm onClickButtonViewCatalog={this.onClickViewCatalog}
                          onClickButtonRegister={this.onClickRegister}
                          onClickButtonSignIn={this.onClickSignIn}
                          onClickButtonSignOut={this.onClickSignOut} />
        {(this.state.showCatalog || this.state.token)?
          <Catalog token={this.state.token} />: null}
      </div>
    );
  }
}
