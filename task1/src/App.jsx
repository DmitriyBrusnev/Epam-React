import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


import Content from './components/content/Content';
import Details from './components/user/Details';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducer/rootReducer';
import thunk from 'redux-thunk';
import { ErrorBoundary } from './components/error/ErrorBoundary.jsx';
import Login from './components/login/Login';
import { Logout } from './components/logout/Logout';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App(props) {
  return (
    <ErrorBoundary>
      <Provider store={ store }>
        <Router>
          <div className="container">
            <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/">
                <Logout />
              </Route>
            </Switch>
            <Route path={['/user/:userId', '/', 'home', '/user/:userId/albums/:albumId', '/user/:userId/albums']} exact >
              <Details { ...props } />
            </Route>
            <Route path={['/albums', '/albums/:albumId', '/user/:userId/albums/:albumId', '/user/:userId/albums']} exact >
              <Content />
            </Route>
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
