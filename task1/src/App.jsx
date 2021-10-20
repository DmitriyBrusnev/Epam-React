import React, { useState, useEffect } from 'react';
import Content from './components/content/Content';
import Details from './components/user/Details';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducer/rootReducer';

const store = createStore(rootReducer);

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
