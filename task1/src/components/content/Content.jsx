import React, { useState, useEffect, useCallback } from 'react';

import './content.scss';

function Content(props) {
    const [state, setState] = useState({
      error: null,
      isLoaded: false,
      albums: []
    });

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
            setState({
              isLoaded: true,
              albums: result
            });
          },
          (error) => {
            setState({
              isLoaded: true,
              error
            });
          }
        )
    }, []);

    const clickHandler = useCallback((e) => {
      const albumID = e.currentTarget.dataset.id;
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
            setState({
              isLoaded: true,
              albums: result
            });
          },
          (error) => {
            setState({
              isLoaded: true,
              error
            });
          }
        )
    }, []);

    const { error, isLoaded, albums } = state;

    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul className='albums' onClick={ clickHandler }>
          {
              albums.map(album => (
              <li key={ album.id } className='albums__item' data-id={ album.id }>
                  Title - <span className='album__title'>{ album.title }</span>
              </li>
              ))
          }
        </ul>
      );
    }
}

export default Content;
