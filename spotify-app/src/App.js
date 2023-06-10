import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import UserProfile from './components/UserProfile';
import spotifyApi from './spotify';
import './App.css';

function App() {
  return (
    <div className="App">
      <UserProfile />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/artist/:id" component={ArtistPage} />
          <Route path="/album/:id" component={AlbumPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
