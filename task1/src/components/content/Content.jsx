import React, { useState, useEffect, useCallback } from 'react';

import './content.scss';
import Photos from './Photos/Photos';

function Content(props) {
    const [state, setState] = useState({
      error: null,
      isLoaded: false,
      albums: []
    });

    const [activeAlbum, setActiveAlbum] = useState({
      albumId: undefined,
      photos: [],
      error: false,
      isLoaded: false,
    });

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then(res => res.json())
        .then(
          (result) => {
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
      let li = e.target.closest('li');
      console.log(li);
      if (!li) return;
      const albumID = li.dataset.id;
      setActiveAlbum({
        albumId: albumID,
        photos: [],
        isLoaded: false,
        error: false,
      });
      fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`)
        .then(res => res.json())
        .then(
          (result) => {
            setActiveAlbum({
              albumId: albumID,
              photos: result,
              isLoaded: true,
              error: false,
            });
          },
          (error) => {
            setActiveAlbum({
              albumId: undefined,
              photos: undefined,
              isLoaded: true,
              error,
            });
          }
        )
    }, []);

    const { error, isLoaded, albums } = state;
    const photosError = activeAlbum.error;
    const photosAreLoaded = activeAlbum.isLoaded;
    const { photos, albumId } = activeAlbum;

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
                { console.log(album.id, albumId) }
                {
                  (albumId && albumId.toString() === album.id.toString()) &&
                  (
                    <div className='photos-container'>
                      <Photos isLoaded={ photosAreLoaded } photos={photos} error={ photosError }  />
                      <span className='backbtn' onClick={(e) => {
                        e.stopPropagation();
                        setActiveAlbum({
                          albumId: undefined,
                          isLoaded: false,
                          photos: [],
                          error: undefined,
                        });
                      }}>&#10006;</span>
                    </div>
                  )
                }
                {
                  (!albumId || albumId.toString() !== album.id.toString()) &&
                  <span className='album__title'>{ album.title }</span>
                }
                
              </li>
            ))
          }
        </ul>
      );
    }
}

export default Content;
