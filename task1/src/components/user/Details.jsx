import React, { useState, useEffect } from 'react';
import Avatar from './Avatar/Avatar';
import Info from './info/Info';

import './details.scss';
import { useParams } from 'react-router';

function Details(props) {
  const params = useParams();
  console.log('params', params);
  return (
    <div className="details">
        <Avatar />
        <Info { ...props } />
    </div>
  );
}

export default Details;

