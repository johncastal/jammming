//import React, { useState, useCallback } from "react";
import './Track.css';

const Track = ({song,addTrackOn,type,removeTrack}) => {
      const addTrack = (event) => {
        addTrackOn(song);
      }
      const remove = (event) =>{
        removeTrack(song)
      }
      //const isTrackInPlaylist = playlistTracks.some((track) => track.id === song.id);
      return(
        <div className="cardTrack">
            <div className="headerCard" key={song.name}>
                    <h3 className="song">{`${song.name}`}</h3>
                    <p>{`${song.artist} | ${song.album}`}</p>
            </div>
              {
                type === 'tracklist' ? (
                  <button className="add" onClick={addTrack}>+</button>
                ) : (
                  <button className="add" onClick={remove}>-</button>
                  //isTrackInPlaylist ? (
                  //  <button className="add" onClick={addTrack}>-</button>
                  //) : (
                  //  <button className="add" onClick={addTrack}>+</button>
                  //)
                )
              }

        </div>
      )
}

export default Track;