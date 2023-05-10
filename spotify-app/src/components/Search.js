import React from 'react';
import spotifyApi from '../spotify';

function Search () {
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    
    const handleSearchResults = (e) => {
        e.preventDefault();
        spotifyApi.searchTracks(search).then((res) => {
        setSearchResults(res.tracks.items);
        });
    };
    
    return (
        <div>
        <form onSubmit={handleSearchResults}>
            <input type="text" value={search} onChange={handleSearch} />
            <button type="submit">Search</button>
        </form>
        <ul>
            {searchResults.map((track) => (
            <li key={track.id}>{track.name}</li>
            ))}
        </ul>
        </div>
    );
}

export default Search;