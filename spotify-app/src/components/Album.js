import React, {useState, useEffect} from 'react';
import spotifyApi from '../spotify';

function Album(props) {
    const [album, setAlbum] = useState(null);
    const [albumTracks, setAlbumTracks] = useState([]);

    useEffect(() => {
        spotifyApi.getAlbum(props.match.params.id).then((res) => {
            setAlbum(res);
        });
        spotifyApi.getAlbumTracks(props.match.params.id).then((res) => {
            setAlbumTracks(res.items);
        });
    }, [props.match.params.id]);

    return (
        <div>
            {album && (
                <div>
                    <h1>{album.name}</h1>
                    <img src={album.images[0].url} alt={album.name} />
                </div>
            )}
            <ul>
                {albumTracks.map((track) => (
                    <li key={track.id}>{track.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Album;
