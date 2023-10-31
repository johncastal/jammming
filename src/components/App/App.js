import React, { useState, useCallback } from "react";
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import Tracklist from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";
import spotify from "../../util/spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [uriPlaylist,setUriPlaylist] = useState([]);

  const  search =  (searchSong) => {
    const tracks = spotify.searchArray(searchSong);
    setSearchResults(tracks);
  };

  const addTrack = (track) => {
    //check if already exist
    if (playlistTracks.some((savedTrack) => savedTrack.uri === track.uri)) {
      return [];
    }
    setPlaylistTracks((prevTracks)=>[...prevTracks,track]);
  }

  const removeTrack = (track) => {
    let newPlaylistTracks = playlistTracks.filter(trackIn => trackIn != track)
    setPlaylistTracks(newPlaylistTracks)
  }


  const savePlaylist = () => {
    // Use map to create an array of uris from playlistTracks
    const uris = playlistTracks.map(track => track.uri);
    // Update the state variable uriPlaylist using the setUriPlaylist function
    setUriPlaylist(uris);
  };
  
  
  return (
    <div className="App">
      <nav className='navBar'>
          Ja<span className="highlight">mmm</span>ing
      </nav>
      <div className='content'>
        <SearchBar onSearch={search}/>
        <div className='content_lists'>
          <Tracklist tracks={searchResults} addTrack={addTrack} playlistTracks={playlistTracks}/>
          <Playlist playlistTracks={playlistTracks} removeTrack={removeTrack} savePlaylist={savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
