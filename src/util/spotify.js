const clientId = '220133310dc04b5cb7049ed1a890d223'; // Insert client ID here.
const redirectUri = 'https://jammmingjcastal.netlify.app'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
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

  async updatePlaylist(idPlaylist,trackUris) {
    //console.log("Actualizando")
    try {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        // Get user ID
        const responseId = await fetch(`https://api.spotify.com/v1/me`, { headers });
        const jsonResponseId = await responseId.json();
        const userId = jsonResponseId.id;

        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${idPlaylist}/tracks`, {
            headers, 
            method: 'GET',
        });
        const jsonResponse = await response.json();
        const tracks = jsonResponse.items.map(track => ({
          id: track.track.id,
          name: track.track.name,
          artist: track.track.artists[0].name,
          album: track.track.album.name,
          uri: track.track.uri
        }));

        // Remove current items
        //console.log("Remove current items");
        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${idPlaylist}/tracks`, {
            headers,
            method: 'DELETE',
            body: JSON.stringify({ uris: tracks.map(track => track.uri) }),
        });

        // Add new items
        //console.log("Add new items");
        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${idPlaylist}/tracks`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris }),
        });

        //return responseAdd;
    } catch (error) {
        // Handle errors here
        console.error('Error updating playlist:', error);
        throw new Error(`Error updating playlist: ${error.message}`);
    }
},

  async unfollowPlaylist(idPlaylist) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    const responseId = await fetch(`https://api.spotify.com/v1/me`, { headers: headers });
    const jsonResponseId = await responseId.json();
    userId = jsonResponseId.id;

    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${idPlaylist}/followers`, {
            headers,
            method: 'DELETE'
        });

  },

  
  

  async getPlaylistNames() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    const responseId = await fetch(`https://api.spotify.com/v1/me`, { headers: headers });
    const jsonResponseId = await responseId.json();
    userId = jsonResponseId.id;

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {headers: headers});
    const jsonResponse = await response.json();
    const playlistsNames = jsonResponse.items.map((item)=>item.name);
    const idPlaylists = jsonResponse.items.map((item)=>item.id);
    const playlistInfo = {
      'playlistsNames':playlistsNames,
      'idPlaylists':idPlaylists
    }
    return playlistInfo;
  },

  async getPlaylistTracks(idPlaylist) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    const response = await fetch(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {headers: headers});
    const jsonResponse = await response.json();
    try{
      const tracks = jsonResponse.items.map(track => ({
        id: track.track.id,
        name: track.track.name,
        artist: track.track.artists[0].name,
        album: track.track.album.name,
        uri: track.track.uri
      }));
      return tracks
    }catch(e){
      console.log(e);
    }
    return []
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

