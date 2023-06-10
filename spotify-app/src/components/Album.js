import React, {useState, useEffect} from 'react';
import spotifyApi from '../spotify';

function Album(props) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (props.match.params.id) { // Check if props.match.params is defined
      spotifyApi.getAlbum(props.match.params.id).then((res) => {
        setAlbum(res);
      });
    }
  }, [props.match.params.id]);

  return (
    <div>
      {album && (
        <div>
          <h1>{album.name}</h1>
          <img src={album.images[0].url} alt={album.name} />
          <p>{album.artists[0].name}</p>
          <p>{album.release_date}</p>
          <ul>
            {album.tracks.items.map((track) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Album;

