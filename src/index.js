import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from './firebase.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
