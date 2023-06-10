import React, { useState, useEffect } from 'react';
import spotifyApi from '../spotify';

function Player() {
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [track, setTrack] = useState(null);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = spotifyApi.getAccessToken();
      const player = new window.Spotify.Player({
        name: 'Spotify Web Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      // Disconnect the previous player before initializing a new one with the updated access token
      if (player._options.id !== null) {
        player.disconnect();
      }

      setPlayer(player);
      player.connect();
    };
  }, [spotifyApi.getAccessToken()]);

  useEffect(() => {
    if (!player) return;

    player.addListener('player_state_changed', (state) => {
      setPlayerState(state);
      setTrack(state.track_window.current_track);
      setTrackDuration(state.duration);
      setTrackProgress(state.position);
    });

    return () => {
      player.removeListener('player_state_changed');
    };
  }, [player]);

  const handlePlay = () => {
    player.resume();
  };

  const handlePause = () => {
    player.pause();
  };

  const handlePrev = () => {
    player.previousTrack();
  };

  const handleNext = () => {
    player.nextTrack();
  };

  const handleSeek = (e) => {
    const progress = e.target.value;
    player.seek(progress);
    setTrackProgress(progress);
  };

  return (
    <div>
      {track && (
        <div>
          <h1>{track.name}</h1>
          <img src={track.album.images[0].url} alt={track.name} />
          <p>{track.artists[0].name}</p>
          <p>{track.album.name}</p>
          <p>{trackProgress}</p>
          <p>{trackDuration}</p>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleNext}>Next</button>
          <input type="range" min="0" max={trackDuration || 0} value={trackProgress} onChange={handleSeek} />
        </div>
      )}
    </div>
  );
}

export default Player;
