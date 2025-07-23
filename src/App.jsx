import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const search = async term => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  };

  const addTrack = track => {
    if (playlist.find(saved => saved.id === track.id)) return;
    setPlaylist([...playlist, track]);
  };

  const removeTrack = track => {
    setPlaylist(playlist.filter(saved => saved.id !== track.id));
  };

  const savePlaylist = () => {
    const trackUris = playlist.map(track => track.uri);
    Spotify.savePlaylist('My Playlist', trackUris).then(() =>
      setPlaylist([])
    );
  };

  return (
    <div>
      <h1>Spotify Playlist App</h1>
      <SearchBar onSearch={search} />
      <SearchResults results={searchResults} onAdd={addTrack} />
      <Playlist playlist={playlist} onRemove={removeTrack} onSave={savePlaylist} />
    </div>
  );
}

export default App;
