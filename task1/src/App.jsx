import React, { useState, useEffect } from 'react';
import Content from './components/content/Content';
import Details from './components/user/Details';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducer/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App(props) {
  return (
    <Provider store={ store }>
      <div className="container">
        <Details { ...props } />
        <Content />
      </div>
    </Provider>
  );
}

export default App;
