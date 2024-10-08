import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxLogger from 'redux-logger'
import pokerReducer from './reducers/pokerReducer';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const rootReducer = combineReducers({ poker: pokerReducer, router: connectRouter(history) });
let store;
if (process.env.NODE_ENV === "development") {
  store = createStore(rootReducer, { poker: {} }, applyMiddleware(thunk, ReduxLogger));
} else {
  store = createStore(rootReducer, { poker: {} }, applyMiddleware(thunk));
}

const rootElement = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <React.Fragment>
      <App history={history} />
    </React.Fragment>
  </Provider>
), rootElement);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
