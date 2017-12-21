import React, { Component } from 'react';
import firebase from './firebase.js';
import Calendar from './components/Calendar';
import Lessons from './components/Lessons';
import Authentication from './components/Authentication';

import './css/index.css';

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
  render() {
    return (
      <div>
        {!this.state.user ?
           <Authentication />
         :
           <div className='app'>
             <Calendar />
             <Lessons />
           </div>
       }
      </div>
    );
  }
}

export default App;
