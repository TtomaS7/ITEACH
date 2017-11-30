import React, { Component } from 'react';
import firebase from './firebase.js';
import Calendar from './components/Calendar';
import Lessons from './components/Lessons';
import './css/index.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Calendar />
        <Lessons />
      </div>
    );
  }
}

export default App;
