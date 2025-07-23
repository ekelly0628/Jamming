import React from 'react';
import TrackCard from './TrackCard';
import styles from './SearchResults.module.css';

function SearchResults({ results, onAdd }) {
  return (
    <div className={styles.results}>
      <h2>Results</h2>
      {results.map(track => (
        <TrackCard
          key={track.id}
          track={track}
          onAction={onAdd}
          actionLabel="+"
        />
      ))}
    </div>
  );
}

export default SearchResults;


