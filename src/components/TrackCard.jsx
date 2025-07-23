// src/components/TrackCard.jsx
import React from 'react';
import styles from './TrackCard.module.css';

function TrackCard({ track, onAction, actionLabel }) {
  return (
    <div className={styles.card}>
      {track.albumArt && (
        <img src={track.albumArt} alt="Album Art" className={styles.albumArt} />
      )}
      <div className={styles.details}>
        <div><strong>{track.name}</strong></div>
        <div>{track.artist} — <em>{track.album}</em></div>
      </div>
      {onAction && (
        <div className={styles.actions}>
          <button onClick={() => onAction(track)}>{actionLabel}</button>
        </div>
      )}
    </div>
  );
}

export default TrackCard;
