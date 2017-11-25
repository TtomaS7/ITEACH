import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App_s from './App_s';
import logo from './logo.svg';
import firebase from './firebase.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App_s />, document.getElementById('root'));
registerServiceWorker();
