const clientId = '220133310dc04b5cb7049ed1a890d223'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(searchSong) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchSong}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },
  
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  },
  
  searchArray(searchSong) {
    const musicLibrary = {
      songs: [
        {
          uri: 1,
          name: "Imagine",
          artist: "John Lennon",
          album: "Imagine",
        },
        {
          uri: 2,
          name: "Bohemian Rhapsody",
          artist: "Queen",
          album: "A Night at the Opera",
        },
        {
          uri: 3,
          name: "Hotel California",
          artist: "Eagles",
          album: "Hotel California",
        },
        {
          uri: 4,
          name: "Shape of You",
          artist: "Ed Sheeran",
          album: "÷ (Divide)",
        },
        {
          uri: 5,
          name: "Rolling in the Deep",
          artist: "Adele",
          album: "21",
        },
        {
          uri: 3,
          name: "Another One Bites the Dust",
          artist: "Queen",
          album: "The Game"
        }
      ],
    };
    const matchingSongs = musicLibrary.songs.filter(song => {
      return (
          song.title === searchSong ||
          song.author === searchSong ||
          song.album === searchSong
          // Add more criteria as needed
      );
    });  
    return matchingSongs
  }
}

export default Spotify;

