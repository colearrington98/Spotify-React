import React, { useEffect, useState } from 'react';
import spotifyApi from '../spotify';
import styles from './Player.module.css';

function Player() {
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [track, setTrack] = useState(null);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await spotifyApi.initPlayer();

        const playerInstance = spotifyApi.getPlayer();
        setPlayer(playerInstance);

        playerInstance.addListener('player_state_changed', (state) => {
          setPlayerState(state);
          setTrack(state.track_window.current_track);
          setTrackDuration(state.duration);
          setTrackProgress(state.position);
        });

        playerInstance.addListener('ready', ({ device_id }) => {
          spotifyApi.setPlayerDevice(device_id);
        });
      } catch (error) {
        console.log('Error occurred while initializing player:', error);
      }
    };

    initializePlayer();
  }, []);

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
    <div className={styles.container}>
      {track && (
        <div className={styles.player-info}>
          <img
            src={track.album.images[0].url}
            alt={track.name}
            className={styles.player-image}
          />
          <div className={styles.track-info}>
            <h1 className={styles.track-name}>{track.name}</h1>
            <p className={styles.artist-name}>{track.artists[0].name}</p>
            <p>{track.album.name}</p>
          </div>
        </div>
      )}
      <div className={styles.player-controls}>
        <button onClick={handlePrev} className={styles.control-button}>
          Prev
        </button>
        <button onClick={handlePlay} className={styles.control-button}>
          Play
        </button>
        <button onClick={handlePause} className={styles.control-button}>
          Pause
        </button>
        <button onClick={handleNext} className={styles.control-button}>
          Next
        </button>
      </div>
      <input
        type="range"
        min="0"
        max={trackDuration}
        value={trackProgress}
        onChange={handleSeek}
        className={styles.track-progress}
      />
    </div>
  );
}

export default Player;

