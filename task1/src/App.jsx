import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


import Content from './components/content/Content';
import Details from './components/user/Details';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducer/rootReducer';
import thunk from 'redux-thunk';
import { ErrorBoundary } from './components/error/ErrorBoundary.jsx';
import Login from './components/login/Login';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App(props) {
  return (
    <ErrorBoundary>
      <Provider store={ store }>
        <Router>
          <div className="container">
            <Route path="/login" exact>
              <Login />
            </Route>
            <Details { ...props } />
            <Content />
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
