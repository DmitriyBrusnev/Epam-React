import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbum, getAlbums } from '../../redux/actions/albums';

import './content.scss';
import Photos from './Photos/Photos';

function Content(props) {
    // const [state, setState] = useState({
    //   error: null,
    //   isLoaded: false,
    //   albums: [],
    //   additionalAlbums: [],
    // });

    const albumsInfo = useSelector((state) => state.albums);

    console.log('rerender');

    const dispatch = useDispatch();

    // const [activeAlbum, setActiveAlbum] = useState({
    //   albumId: undefined,
    //   photos: [],
    //   error: false,
    //   isLoaded: false,
    // });

    useEffect(() => {
      dispatch(getAlbums());
      // fetch("https://jsonplaceholder.typicode.com/albums")
      //   .then(res => res.json())
      //   .then(
      //     (result) => {
      //       // setState((prevState) => ({
      //       //   ...prevState,
      //       //   isLoaded: true,
      //       //   albums: result
      //       // }));
      //     },
      //     (error) => {
      //       // setState((prevState) => ({
      //       //   ...prevState,
      //       //   isLoaded: true,
      //       //   error
      //       // }));
      //     }
      //   )
    }, [dispatch]);

    const clickHandler = useCallback((e) => {
      let li = e.target.closest('li');
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

    const addAlbumHandler = useCallback((e) => {
      const newAlbum = {
        id: Date.now(),
        title: 'New Album',
      };

      dispatch(addAlbum(newAlbum));
    }, [dispatch]);

    const { albums, albumsLoaded, albumAdded, additionalAlbums, albumsLoadError, activeAlbumInfo } = albumsInfo;

    // const photosError = activeAlbum.error;
    // const photosAreLoaded = activeAlbum.isLoaded;
    const { photos, albumId } = activeAlbumInfo;

    if (error) {
      return <div>Error: { albumsLoadError.message }</div>;
    } else if (!albumsLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="wrapper">
          <div className={ "btn-add-album " + (!albumAdded ? 'disabled' : '') } onClick={ addAlbumHandler }>Добавить альбом</div>
          <ul className='albums' onClick={ clickHandler }>
            {
              additionalAlbums.concat(albums).map(album => (
                <li key={ album.id } className='albums__item' data-id={ album.id }>
                  {
                    (albumId && albumId.toString() === album.id.toString()) &&
                    (
                      <div className='photos-container'>
                        <Photos isLoaded={ photosAreLoaded } photos={ photos } error={ photosError }  />
                        <span className='backbtn' onClick={(e) => {
                          e.stopPropagation();
                          // setActiveAlbum({
                          //   albumId: undefined,
                          //   isLoaded: false,
                          //   photos: [],
                          //   error: undefined,
                          // });
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
        </div>
      );
    }
}

export default Content;
