import React, { useEffect, useState } from 'react';
import spotifyApi from '../spotify';
import styles from './Artist.module.css';

function Artist(props) {
  const [artist, setArtist] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistData = await spotifyApi.getArtist(props.match.params.id);
        const artistAlbumData = await spotifyApi.getArtistAlbums(
          props.match.params.id
        );

        setArtist(artistData);
        setArtistAlbums(artistAlbumData.items);
      } catch (error) {
        console.log('Error occurred while fetching artist data:', error);
      }
    };

    fetchArtistData();
  }, [props.match.params.id]);

  return (
    <div className={styles.container}>
      {artist && (
        <div className={styles.artist-info}>
          <img
            src={artist.images[0].url}
            alt={artist.name}
            className={styles.artist-image}
          />
          <h1 className={styles.artist-name}>{artist.name}</h1>
        </div>
      )}
      <ul className={styles.album-list}>
        {artistAlbums.map((album) => (
          <li key={album.id} className={styles.album-item}>
            <img
              src={album.images[0].url}
              alt={album.name}
              className={styles.album-image}
            />
            <h3 className={styles.album-name}>{album.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Artist;


