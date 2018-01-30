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
         :
           <div className='app'>
             <header>
               <div className="wrapper header">
                 <button className='sign-out' onClick={this.onSignOut}>Вийти</button>
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
