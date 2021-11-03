import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbum, getAlbums, setActiveAlbum } from '../../redux/actions/albums';
import { addAlbumPhoto, getAlbumPhotos } from '../../redux/actions/photos';

import './content.scss';
import Photos from './Photos/Photos';
import Modal from '../modal/Modal';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function Content(props) {
  const [ modalInfo, setModalInfo ] = useState({ isOpen: false, content: (<div></div>), title: 'Album', okHandler: () => { /** */ } });

  const urlParams = useParams();
  console.log('params', urlParams);

  const dispatch = useDispatch();
  
  const albumsInfo = useSelector((state) => state.albums);
  const photosInfo = useSelector((state) => state.photos);
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  useEffect(() => {
    if (urlParams.albumId) {
      dispatch(getAlbumPhotos(urlParams.albumId));
    }
  }, [urlParams.albumId]);

  const showAlbumPhotosHandler = useCallback((e) => {
    let li = e.target.closest('li');
    if (!li) return;
    const albumId = li.dataset.id;
    dispatch(getAlbumPhotos(albumId));
  }, []);

  const albumTitleInput = useRef(null);
  const photoInfoInput = useRef(null);

  const addAlbumHandler = useCallback((e) => {
    const newAlbum = {
      id: Date.now(),
      title: albumTitleInput.current.value,
    };

    dispatch(addAlbum(newAlbum));

    setModalInfo((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, [dispatch]);

  const addPhotoToAlbumHandler = useCallback((e) => {
    const newPhoto = {
      id: Date.now(),
      albumId,
      url: `/public/img/${photoInfoInput.current.files[0].name}`,
    };

    dispatch(addAlbumPhoto(newPhoto));

    setModalInfo((prev) => ({
      ...prev,
      isOpen: false,
    }));
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
        <Modal open={ modalInfo.isOpen } title={ modalInfo.title } onClose={ () => { setModalInfo((prev) => ({ ...prev, isOpen: false, })); } } okHandler={ modalInfo.okHandler } >
          { modalInfo.content }
        </Modal>
        <div className={ "btn-add-album " + (!albumAdded ? 'disabled' : '') } onClick={ albumAdded ? () => {
          setModalInfo((prev) => ({
            ...prev,
            okHandler: addAlbumHandler,
            isOpen: true,
            content: (
              <div className="title-container">
                <label htmlFor="album-title">Title:</label>
                <input type="text" id="album-title" ref={ albumTitleInput } />
              </div>
            ),
            title: 'Album',
          }));
        } : null }>Добавить альбом</div>
        <ul className='albums' >
        {/* onClick={ showAlbumPhotosHandler } */}
          {
            additionalAlbums.concat(albums).filter((el) => urlParams.userId ? urlParams.userId.toString() === el.userId.toString() : true).map(album => (
              <li key={ album.id } className='albums__item' data-id={ album.id }>
                  {
                    (albumId && albumId.toString() === album.id.toString()) &&
                    (
                      <div className='photos-container'>
                        <Photos isLoaded={ photosLoaded } photos={ photos.concat(activeAlbomAdditionalPhotos) } error={ photosLoadError }  />
                        <div className="buttons">
                          <span className='btn-add-photo' onClick={ (e) => {
                            e.stopPropagation();
                            setModalInfo((prev) => ({
                              ...prev,
                              okHandler: addPhotoToAlbumHandler,
                              isOpen: true,
                              content: (
                                <div className="photo-container">
                                  <input type="file" id="photo-info" ref={ photoInfoInput } />
                                </div>
                              ),
                              title: 'Image'
                            }));
                          } }>
                            <img className="icon-add-photo" src="/public/img/addPhoto.png" alt="" />
                          </span>
                          <Link to={urlParams.userId ? `/user/${urlParams.userId}/albums` : `/albums`}>
                            <span className='backbtn' onClick={(e) => {
                              dispatch(setActiveAlbum({ albumId: null }));
                            }}>&#10006;</span>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                  {
                    (!albumId || albumId.toString() !== album.id.toString()) &&
                    <Link to={urlParams.userId ? `/user/${urlParams.userId}/albums/${album.id}` : `/albums/${album.id}`}>
                      <span className='album__title'>{ album.title }</span>
                    </Link>
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
