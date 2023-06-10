import React, { useEffect, useState } from 'react';
import spotifyApi from '../spotify';
import styles from './Playlist.module.css';

function Playlist() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await spotifyApi.getPlaylists();
        setPlaylists(response);
      } catch (error) {
        console.log('Error occurred while fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className={styles.container}>
      {playlists.map((playlist) => (
        <div className={styles.playlist-item} key={playlist.id}>
          <img
            src={playlist.image}
            alt={playlist.name}
            className={styles.playlist-image}
          />
          <div>
            <h3 className={styles.playlist-name}>{playlist.name}</h3>
            <p className={styles.playlist-owner}>
              Created by {playlist.owner}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Playlist;

