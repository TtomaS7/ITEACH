import React from 'react';
import { connect } from 'react-redux'

import Calendar from './Calendar';
import * as actions from '../actions';
import swal from 'sweetalert'
import firebase from 'firebase';
import '../css/Authentication.css';



export default class Authentication extends React.Component {
  constructor() {
    super();

    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser){
        console.log(firebaseUser);
        console.log('logged in');
        document.getElementsByClassName('auth')[0].style.display = 'none';
      } else {
        console.log('not logged in');
        document.getElementsByClassName('auth')[0].style.display = 'block';

      }
    })

    this.state = {
      user: null
    }
  }

  buttonSignUp = () => {
        document.getElementsByClassName('butLogIn')[0].style.display = 'none';
        document.getElementsByClassName('butSignUp')[0].style.display = 'block';

  }
  buttonSignIn = () => {
        document.getElementsByClassName('butLogIn')[0].style.display = 'block';
        document.getElementsByClassName('butSignUp')[0].style.display = 'none';

  }
  on1LessonAdd = () => {
    if (!this.className.value || !this.topic.value) {
      swal("Oops...", "Something went wrong! Please, add class or topic.", "error");
     return false;
    } else {
     swal("Good job!", "You addedsomething!", "success")
    }
    this.props.onLessonAdd({
      className: this.className.value,
      topic: this.topic.value,
    })
  }
  onLogIn = () => {
    const  email = this.txtLogin.value;
    const  pass = this.txtPassword.value;
    const  auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  }

  onSignUp = () => {
    const  email = this.txtLogin.value;
    const  pass = this.txtPassword.value;
    const  resetPass = this.txtResetPassword.value;
    const  auth = firebase.auth();
    debugger;

      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  }

  onSignOut = () => {
      firebase.auth().signOut();
  }

  async login() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const  auth = firebase.auth();
    const result = await auth.signInWithPopup(provider)
    this.setState({user: result.user});
  }

  render() {
    return (
      <div className='auth' style= {{display : 'none'}}>
        <h1 data-shadow='dang!'>ITEACH</h1>
      <div className='main_auth'>
        <form>
          <input defaultChecked id='signin' name='action' type='radio' value='signin' />
           <label htmlFor='signin' onClick={this.buttonSignIn} >Sign in</label>
          <input id='signup' name='action' type='radio' value='signup' />
           <label htmlFor='signup' onClick={this.buttonSignUp} >Sign up</label>
          <div id='wrapper'>
            <div id='arrow'></div>
            <input id='email' className="main_input_login" ref={el => {this.txtLogin = el}} type="text" placeholder="Login" />
            <input className="main_input_password" ref={el => {this.txtPassword = el}} type="text"  placeholder="Password" />
            <input className="reset_input_password" ref={el => {this.txtResetPassword = el}} type="text"  placeholder="Reset password" />
          </div>
          <button className="butLogIn" onClick={this.onLogIn} >Log In</button>
          <div className="butSignUp" style= {{display : 'none'}}>
            <button onClick={this.onSignUp} >Sign Up</button>
            <button onClick={this.login.bind(this)} >Login with Facebook</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}
