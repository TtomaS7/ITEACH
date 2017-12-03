import React from 'react';

import swal from 'sweetalert'
import firebase from 'firebase';
import  '../css/App_s.css'

export default class AddLesson extends React.Component {
  constructor() {
    super();

    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser){
        console.log(firebaseUser);

      } else {
        console.log('not logged in');
      }
    })

    this.state = {
      user: null
    }
  }
  onLessonAdd = () => {
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
    const  auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  }

  onSignOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <input className="main_input_login" ref={el => {this.txtLogin = el}} type="text" placeholder="Login" />
        <br/>
        <input className="main_input_password" ref={el => {this.txtPassword = el}} type="text"  placeholder="Password" />
        <br/>
        <button onClick={this.onLogIn}>Log In</button>
        <br/>
        <button onClick={this.onSignUp}>Sign Up</button>
        <br/>
        <button className="logOut" onClick={this.onSignOut}>Sign Out</button>
        <br/>
        <br/>
        <br/>
        <br/>
        <input className="main_input_class" ref={el => {this.className = el}} type="text" placeholder="Класс" />
        <br/>
        <input className="main_input_topic" ref={el => {this.topic = el}} type="text"  placeholder="Тема" />
        <br/>
        <button onClick={this.onLessonAdd}>Добавить</button>
      </div>
    );
  }
}
