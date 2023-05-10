import React from "react";
import spotifyApi from "../spotify";

function Playlist() {
    const [playlists, setPlaylists] = React.useState([]);

    React.useEffect(() => {
        spotifyApi.getUserPlaylists().then((res) => {
            setPlaylists(res.items);
        });
    }
    , []);

    return (
        <div>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Playlist;
