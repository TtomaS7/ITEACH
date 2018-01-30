import React, { Component } from 'react';
import firebase from './firebase.js';
import Calendar from './components/Calendar';
import Lessons from './components/Lessons';
import Authentication from './components/Authentication';

import './css/index.css';
import './css/Header.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null
    }

    window.firebase = firebase
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        console.log('logged in');
        this.setState({ user: firebaseUser });
      } else {
        console.log('not logged in');
        this.setState({ user: null })
      }
    })
  }
  onSignOut = () => {
    firebase.auth().signOut();
  }
  render() {
    return (
      <div>
        {!this.state.user ?
           <Authentication />
           { /*Скороченный вигляд кожного з компонентів
                   <input id='email' className="main_input_login" ref={el => {this.txtLogin = el}} type="text" placeholder="Login" />
                   <input className="main_input_password" ref={el => {this.txtPassword = el}} type="password"  placeholder="Password" />
                   <input className="repeat_input_password" ref={el => {this.txtRepeatPassword = el}} type="password"  placeholder="Repeat password" />

                 <button className="butLogIn" onClick={this.onLogIn}>Log In</button>
                   <button onClick={this.onSignUp}>Sign Up</button>
                   <button onClick={this.login.bind(this)}>Login with Facebook</button>
            */}
         :
           <div className='app'>
             <header>
               <div className="wrapper header">
                 <button className='sign-out' onClick={this.onSignOut}>Sign-out</button>
               </div>
             </header>
             <div className='mainContent'>
               <Calendar />
               <Lessons />
             </div>
           </div>
       }
      </div>
    );
  }
}

export default App;
