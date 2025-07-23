import React, { useState } from 'react';

import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSearch = () => onSearch(term);


return (
  <div className={styles.searchBar}>
    <input 
      className={styles.input}
      placeholder="Enter a song, artist, or genre"
      onChange={e => setTerm(e.target.value)}
    />
    <button className={styles.button} onClick={handleSearch}>Search</button>
  </div>
);

}

export default SearchBar;
