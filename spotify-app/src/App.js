import React from 'react';
import Search from './components/Search';
import Playlist from './components/Playlist';
import Artist from './components/Artist';
import UserProfile from './components/UserProfile';
import Album from './components/Album';
import './App.css';

function App() {
    return (
        <div className="App">
            <UserProfile />
            <Search />
            <Playlist />
            <Artist id="ARTIST_ID_HERE" />
            <Album id="ALBUM_ID_HERE" />
        </div>
    );
}

export default App;
