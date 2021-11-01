import React, { useState, useEffect } from 'react';
import Avatar from './Avatar/Avatar';
import Info from './info/Info';

import './details.scss';

function Details(props) {
  return (
    <div className="details">
        <Avatar />
        <Info { ...props } />
    </div>
  );
}

export default Details;

