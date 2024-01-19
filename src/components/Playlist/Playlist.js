import React, { useState,useEffect } from "react";
import Track from '../Track/Track.js'
import './Playlist.css';

const Playlist =  ({playlistTracks,removeTrack,savePlaylist,playlistName,queryPlaylistName,updatePlaylist,namesPlayList,unfollowPlaylist}) => {
  const [isLoading, setIsLoading] = useState(false); 
  const [inputValue, setInputValue] = useState('');
  const [activePlaylist,setActivePlaylist] = useState(false);

  const handleChangeInput = (event) => {
    playlistName(event.target.value);
  };
  

  // Effect to set the initial value when the component mounts
  useEffect(() => {
    const inputPlaylist = queryPlaylistName();
    setInputValue(inputPlaylist);
    
    const newOrOldPlaylist = namesPlayList.includes(inputPlaylist)

    if (newOrOldPlaylist) {
      setActivePlaylist(true);
    } else {
      setActivePlaylist(false);
    }
  
  }, [queryPlaylistName, playlistTracks,namesPlayList,inputValue]);
  

  const handleSaveClick = async() => {
    // update Playlist
    if(activePlaylist){
        setIsLoading(true);
        try {
            await updatePlaylist();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    // save playlist
    } else {
        setIsLoading(true);
        // Call the savePlaylist function with the inputValue
        try {
            // Trigger the Promise (assuming savePlaylist is an asynchronous function)
            await savePlaylist();

            // Once the Promise is resolved, update the state variable to indicate saving is complete
            setIsLoading(false);
        } catch (error) {
            // Handle any errors if the Promise rejects
            setIsLoading(false);
            console.error(error);
        }
    } 
  };

  //unfollow Playlist
  const handleUnfollowPlaylist = async() => {
    setIsLoading(true);
    try {
        await unfollowPlaylist();
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error(error);
    }
  }

  return (
    <div className="Playlist">
      <input type="text" className="namePlayList" onChange={handleChangeInput} value={inputValue} />
      {playlistTracks.map((song) => (
        <Track song={song} type={'playlist'} removeTrack={removeTrack} key={song.name} />
      ))}
      <div className="saveSpotify">
        {isLoading ? (
          <div className="spinner">Loading...</div>
        ) : activePlaylist ? (
          <button className="save" onClick={handleSaveClick}>
            <h3>Update to Spotify</h3>
          </button>
        ) : (
          <button className="save" onClick={handleSaveClick}>
            <h3>Save to Spotify</h3>
          </button>
        )}
        <div className="unfollowPlaylist">
        <button className="save" onClick={handleUnfollowPlaylist}>
          <h3>Unfollow to Spotify</h3>
        </button>
      </div>
      </div>
    </div>
  );
}

export default Playlist;