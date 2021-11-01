import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbum, getAlbums, setActiveAlbum } from '../../redux/actions/albums';
import { addAlbumPhoto, getAlbumPhotos } from '../../redux/actions/photos';

import './content.scss';
import Photos from './Photos/Photos';

function Content(props) {
  const dispatch = useDispatch();
  
  const albumsInfo = useSelector((state) => state.albums);
  const photosInfo = useSelector((state) => state.photos);

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  const showAlbumPhotosHandler = useCallback((e) => {
    let li = e.target.closest('li');
    if (!li) return;
    const albumId = li.dataset.id;
    dispatch(getAlbumPhotos(albumId));
  }, []);

  const addAlbumHandler = useCallback((e) => {
    const newAlbum = {
      id: Date.now(),
      title: 'New Album',
    };

    dispatch(addAlbum(newAlbum));
  }, [dispatch]);

  const addPhotoToAlbumHandler = useCallback((e) => {
    e.stopPropagation();
    let li = e.target.closest('li');
    if (!li) return;
    const albumId = li.dataset.id;
    const newPhoto = {
      id: Date.now(),
      albumId,
      url: './public/img/photo.png',
    };
    dispatch(addAlbumPhoto(newPhoto));
  });

  const { albums, albumsLoaded, albumAdded, additionalAlbums, albumsLoadError, activeAlbumInfo } = albumsInfo;
  const { photosLoaded, photosLoadError, additionalPhotos } = photosInfo;
  const { photos, albumId } = activeAlbumInfo;

  const activeAlbomAdditionalPhotos = additionalPhotos.filter((el) => el.albumId === albumId);

  if (albumsLoadError) {
    return <div>Error: { albumsLoadError.message }</div>;
  } else if (!albumsLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="wrapper">
        <div className={ "btn-add-album " + (!albumAdded ? 'disabled' : '') } onClick={ albumAdded ? addAlbumHandler : null }>Добавить альбом</div>
        <ul className='albums' onClick={ showAlbumPhotosHandler }>
          {
            additionalAlbums.concat(albums).map(album => (
              <li key={ album.id } className='albums__item' data-id={ album.id }>
                {
                  (albumId && albumId.toString() === album.id.toString()) &&
                  (
                    <div className='photos-container'>
                      <Photos isLoaded={ photosLoaded } photos={ photos.concat(activeAlbomAdditionalPhotos) } error={ photosLoadError }  />
                      <div className="buttons">
                        <span className='btn-add-photo' onClick={ addPhotoToAlbumHandler }><img className="icon-add-photo" src="./public/img/addPhoto.png" alt="" /></span>
                        <span className='backbtn' onClick={(e) => {
                          e.stopPropagation();
                          dispatch(setActiveAlbum({ albumId: null, photos: [] }));
                        }}>&#10006;</span>
                      </div>
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
