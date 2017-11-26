import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import 'reset-css/reset.css';

import App from './App';
import firebase from './firebase.js';
import registerServiceWorker from './registerServiceWorker';
import storeReducers from './store/reducers';
import * as actions from './actions';

let store = createStore(storeReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
const date = store.getState().app.selectedDate;
store.dispatch(actions.loadLessons(date))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
