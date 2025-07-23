// src/spotify.js
const clientId = 'df16a78c473c4bf4a11c2ce28c235af6'; //client ID
const redirectUri = 'https://ekelly0628.github.io/Jamming/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const scope = 'playlist-modify-public';
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
      window.location = authUrl;
    }
  },

  async search(term) {
  const token = Spotify.getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const jsonResponse = await response.json();
  if (!jsonResponse.tracks) return [];

  return jsonResponse.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    albumArt: track.album.images[1]?.url || track.album.images[0]?.url || '',
    uri: track.uri,
  }));
},


async savePlaylist(name, trackUris) {
  if (!name || !trackUris.length) return;

  const token = Spotify.getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const userResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: headers,
  });
  const userId = (await userResponse.json()).id;

  const playlistResponse = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name: name }),
    }
  );
  const playlistData = await playlistResponse.json();
  const playlistId = playlistData.id;

  return fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ uris: trackUris }),
    }
  );
 }

};
export default Spotify;
