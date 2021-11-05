import React, { useState, useEffect } from 'react';

import './avatar.scss';

function Avatar(props) {
  return (
    <div className="avatar">
        <img src="/public/img/avatar.jpg" alt="avatar" />
    </div>
  );
}

export default Avatar;

