import React from 'react';

import './photos.scss';

function Photos(props) {
  const { photos, isLoaded, error } = props;

  if (error) {
    return <div>Photos did't loaded: { error.message }</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='photos'>
        {
          Array.from(photos).map(photo => (
            <span key={ photo.id } className='photo__item'>
                <img src={ photo.url } alt="photo" />
            </span>
          ))
        }
      </div>
    );
  }
}

export default Photos;
