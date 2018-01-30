import React from 'react';
import { connect } from 'react-redux'

import swal from 'sweetalert2';
import firebase from 'firebase';
import '../css/Authentication.css';



export default class Authentication extends React.Component {
  constructor() {
    super();
    const provider = new firebase.auth.FacebookAuthProvider();
  }

  buttonSignUp = () => {
    document.getElementsByClassName('butLogIn')[0].style.display = 'none';
    document.getElementsByClassName('butSignUp')[0].style.display = 'block';
  }

  buttonSignIn = () => {
    document.getElementsByClassName('butLogIn')[0].style.display = 'block';
    document.getElementsByClassName('butSignUp')[0].style.display = 'none';
  }



  onLogIn = () => {
    const  email = this.txtLogin.value;
    const  pass = this.txtPassword.value;
    const  auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      swal('Упс....тут помилка(');
    } else if (errorCode == 'auth/user-disabled') {
      swal('Упс....тут помилка(');
    } else if (errorCode == 'auth/user-not-found') {
      swal('Упс....тут помилка(');
    } else if (errorCode == 'auth/wrong-password') {
      swal('Упс....тут помилка(');
    } else {
      swal('Упс....тут помилка(')
    }
    console.log(error);
  })
  }

  onSignUp = () => {
    const email = this.txtLogin.value;
    const pass = this.txtPassword.value;
    const repeatPass = this.txtRepeatPassword.value;
    const auth = firebase.auth();
    if (pass === repeatPass){
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/expired-action-code') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/invalid-action-code') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/user-disabled') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/user-not-found') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/email-already-in-use') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/invalid-email') {
          swal('Упс....тут помилка(');
        } else if (errorCode == 'auth/operation-not-allowed') {
          swal('Упс....тут помилка(')
        } else {
          swal('Упс....тут помилка(')
        }
        console.log(error);
      })
    } else {
      swal('Упс....тут помилка(');
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault()
  }

  async login() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const auth = firebase.auth();
    const result = await auth.signInWithPopup(provider).cath(error => {
      // HANDLE ERROR
    })
  }

  render () {
    return (
      <div className='auth'>
        <h1 data-shadow='dang!'>ITEACH</h1>
        <div className='main_auth'>
          <form onSubmit={this.onFormSubmit}>
            <input defaultChecked id='signin' name='action' type='radio' value='signin' />
            <label htmlFor='signin' onClick={this.buttonSignIn}>Увійти</label>

            <input id='signup' name='action' type='radio' value='signup' />
            <label htmlFor='signup' onClick={this.buttonSignUp}>Зареєструватися</label>

            <div id='wrapper'>
              <div id='arrow'></div>
              <input id='email' className="main_input_login" ref={el => {this.txtLogin = el}} type="text" placeholder="Пошта" />
              <input className="main_input_password" ref={el => {this.txtPassword = el}} type="password"  placeholder="Пароль" />
              <input className="repeat_input_password" ref={el => {this.txtRepeatPassword = el}} type="password"  placeholder="Введіть пароль вдруге" />
            </div>
            <button className="butLogIn" onClick={this.onLogIn}>Увійти</button>
            <div className="butSignUp" style= {{display : 'none'}}>
              <button onClick={this.onSignUp}>Зареєструватися</button>
              <button onClick={this.login.bind(this)}>Зареєструватися за допомогою Фейсбука</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
