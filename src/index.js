import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// import Provider
import { Provider } from 'react-redux';
// import craeteStore to craete a store
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import reducer form reducer file
import reducer from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
//create a store
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
 <Provider store={store}>
  <App />
 </Provider>,
 document.getElementById('root')
);
