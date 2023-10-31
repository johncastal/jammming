import React, { useState, useCallback } from "react";
import Track from '../Track/Track.js'
import './Playlist.css';

const Playlist = ({playlistTracks,removeTrack,savePlaylist}) => {
    
    return(
        <div className="Playlist">
            <input className="namePlayList"/>
            {
                playlistTracks.map((song)=>(
                    <Track song={song} type={'playlist'} removeTrack={removeTrack}/>
                ))
            }
          <div className="saveSpotify">
            <button className="save" onClick={savePlaylist}>
              <h3>Save to Spotify</h3>
            </button>
          </div>
        </div>
    )
}

export default Playlist;