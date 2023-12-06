import React, { useState,useEffect } from "react";
import Track from '../Track/Track.js'
import './Playlist.css';

const Playlist = ({playlistTracks,removeTrack,savePlaylist,playlistName,queryPlaylistName}) => {
  const [isSaving, setIsSaving] = useState(false); 
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (event) => {
    playlistName(event.target.value)
  };

  // Effect to set the initial value when the component mounts
  useEffect(() => {
    setInputValue(queryPlaylistName);
  },[queryPlaylistName]);

  const handleSaveClick = async() => {
    setIsSaving(true);
    // Call the savePlaylist function with the inputValue
    try {
      // Trigger the Promise (assuming savePlaylist is an asynchronous function)
      await savePlaylist();

      // Once the Promise is resolved, update the state variable to indicate saving is complete
      setIsSaving(false);
    } catch (error) {
      // Handle any errors if the Promise rejects
      setIsSaving(false);
      console.error(error);
    }
    
  };

    return(
        <div className="Playlist">
            <input type="text" className="namePlayList" onChange={handleChangeInput} value={inputValue}/>
            {
                playlistTracks.map((song)=>(
                    <Track song={song} type={'playlist'} removeTrack={removeTrack} key={song.name}/>
                ))
            }
          <div className="saveSpotify">
            {isSaving ? (
              <div className="spinner">Loading...</div>
              ) : (
                <button className="save" onClick={handleSaveClick}>
                  <h3>Save to Spotify</h3>
                </button>
              )
            }
          </div>
        </div>
    )
}

export default Playlist;