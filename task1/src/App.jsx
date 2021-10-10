import React, { useState, useEffect } from 'react';
import Content from './components/content/Content';
import Details from './components/user/Details';

function App(props) {
  return (
    <div className="container">
      <Details { ...props } />
      <Content />
    </div>
  );
}

export default App;
