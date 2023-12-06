import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import Tracklist from "../Tracklist/Tracklist";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/spotify";
import PlaylistList from "../PlaylistList/PlaylistList";  

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [uriPlaylist,setUriPlaylist] = useState([]);
  const [playlistName,SetPlaylistName] = useState('');
  const [namesPlaylist,setnamesPlaylist] = useState([]);
  const [idPlaylists,setIdPlaylists] = useState([]);

  // To get the names of the playlists and Ids
  const handleNamesPlayList = async () => {
    try {
      const { playlistsNames,idPlaylists } = await Spotify.getPlaylistNames();
      setnamesPlaylist(playlistsNames);
      setIdPlaylists(idPlaylists);
    } catch (error) {
      console.error(error);
    }
  };


  // to update tracklist when user select a playlist
  const playlistListTracks = async (idPlaylists) => {
    try {
      const tracks = await Spotify.getPlaylistTracks(idPlaylists);
      setPlaylistTracks(tracks)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=>{
    setnamesPlaylist(handleNamesPlayList);
  },[])

  
  useEffect(()=>{
    Spotify.getAccessToken();
  },[])


  const  search =  async (searchSong) => {
    try {
      const tracks = await Spotify.search(searchSong);
      setSearchResults(tracks);
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

  const queryPlaylistName = () => {
    return playlistName
  }

  // required to update UriPlaylist as a state variable
  useEffect(() => {
    const uri = playlistTracks.map(track => track.uri);
    setUriPlaylist(uri);
  }, [playlistTracks]);

  const handleSavePlaylist = async () => {
    try {
      await Spotify.savePlaylist(playlistName, uriPlaylist);
      setPlaylistTracks([]);
      setnamesPlaylist(handleNamesPlayList);
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
          <Playlist playlistTracks={playlistTracks} removeTrack={removeTrack} savePlaylist={handleSavePlaylist} playlistName={handlePlaylistName} queryPlaylistName={queryPlaylistName}/>
          <PlaylistList namesPlayList={namesPlaylist} idPlaylists={idPlaylists} itemsPlaylist={playlistListTracks} playlistName={handlePlaylistName}/>
        </div>
      </div>
    </div>
  );
}

export default App;
