import React from 'react';
import TrackCard from './TrackCard';
import styles from './Playlist.module.css';

function Playlist({ playlist, onRemove, onSave }) {
  return (
    <div className={styles.playlist}>
      <h2>Your Playlist</h2>
      {playlist.map(track => (
        <TrackCard
          key={track.id}
          track={track}
          onAction={onRemove}
          actionLabel="-"
        />
      ))}
      <button className={styles.button} onClick={onSave}>
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;
