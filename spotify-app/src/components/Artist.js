import React, {useState, useEffect} from 'react';
import spotifyApi from '../spotify';

function Artist(props) {
    const [artist, setArtist] = useState(null);
    const [artistAlbums, setArtistAlbums] = useState([]);

    useEffect(() => {
        spotifyApi.getArtist(props.match.params.id).then((res) => {
            setArtist(res);
        });
        spotifyApi.getArtistAlbums(props.match.params.id).then((res) => {
            setArtistAlbums(res.items);
        });
    }, [props.match.params.id]);

    return (
        <div>
            {artist && (
                <div>
                    <h1>{artist.name}</h1>
                    <img src={artist.images[0].url} alt={artist.name} />
                </div>
            )}
            <ul>
                {artistAlbums.map((album) => (
                    <li key={album.id}>
                        <img src={album.images[0].url} alt={album.name} />
                        <h3>{album.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Artist;