import React, { useState, useCallback } from "react";
import './Tracklist.css';
import Track from '../Track/Track.js'

const Tracklist = ({ tracks,addTrack,playlistTracks }) => {
  return (
    <div className="TrackList">
      <h2>Results</h2>
      {
        Array.isArray(tracks) && tracks.map((song) => (
          <Track song={song} addTrackOn={addTrack} type={'tracklist'} /> // Remember to add a unique "key" prop
        ))
      }
    </div>
  );
}


export default Tracklist;