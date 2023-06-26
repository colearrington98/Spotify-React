import React, { useEffect, useState } from 'react';
import spotifyApi from '../spotify';
import styles from './Album.module.css';

function Album(props) {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumData = await spotifyApi.getAlbum(props.match.params.id);
        const trackData = await spotifyApi.getAlbumTracks(props.match.params.id);

        setAlbum(albumData);
        setTracks(trackData.items);
      } catch (error) {
        console.log('Error occurred while fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [props.match.params.id]);

  return (
    <div className={styles.container}>
      {album && (
        <div className={styles.album-info}>
          <img
            src={album.images[0].url}
            alt={album.name}
            className={styles.album-image}
          />
          <div className={styles.album-details}>
            <h1 className={styles.album-name}>{album.name}</h1>
            <p className={styles.album-artist}>{album.artists[0].name}</p>
          </div>
        </div>
      )}
      <ul className={styles.track-list}>
        {tracks.map((track, index) => (
          <li key={track.id} className={styles.track-item}>
            <span className={styles.track-number}>{index + 1}</span>
            <span className={styles.track-name}>{track.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;

