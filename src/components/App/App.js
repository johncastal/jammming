import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import Tracklist from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [uriPlaylist,setUriPlaylist] = useState([]);
  const [playlistName,SetPlaylistName] = useState('');

  useEffect(()=>{
    Spotify.getAccessToken();
  })

  //Spotify.getAccessToken();
  const  search =  async (searchSong) => {
    //const tracks = Spotify.searchArray(searchSong);
    //setSearchResults(tracks);
    try {
      const tracks = await Spotify.search(searchSong);
      setSearchResults(tracks);
      //console.log(tracks);
    } catch (error) {
      console.error(error);
    }
  };

  const addTrack = (track) => {
    //check if already exist
    if (playlistTracks.some((savedTrack) => savedTrack.uri === track.uri)) {
      return [];
    }
    setPlaylistTracks((prevTracks)=>[...prevTracks,track]);
  }

  

  const removeTrack = (track) => {
    let newPlaylistTracks = playlistTracks.filter(trackIn => trackIn !== track)
    setPlaylistTracks(newPlaylistTracks)
  }

  const handlePlaylistName = (name) => {
    SetPlaylistName(name);
  }

  useEffect(() => {
    const uri = playlistTracks.map(track => track.uri);
    setUriPlaylist(uri);
  }, [playlistTracks]);

  const handleSavePlaylist = async () => {
    try {
      await Spotify.savePlaylist(playlistName, uriPlaylist);
      setPlaylistTracks([]);
    } catch (error) {
      console.error(error);
    }
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
          <Playlist playlistTracks={playlistTracks} removeTrack={removeTrack} savePlaylist={handleSavePlaylist} playlistName={handlePlaylistName}/>
        </div>
      </div>
    </div>
  );
}

export default App;
