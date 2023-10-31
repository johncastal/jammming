import React, { useState, useCallback } from "react";
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
    const [searchSong, setSearchSong] = useState("");

    const handleSearchSongChange = useCallback((event) => {
        setSearchSong(event.target.value);
      }, []);
    
    const search = () => {
        onSearch(searchSong);
        // Handle the result directly
    };
    
    return (
        <div className="SearchBar">
            <input className="inputSearch" placeholder="Enter A Song Title" onChange={handleSearchSongChange}/>
            <button className="SearchButton" onClick={search}>
                Search
            </button>
        </div>
    )
}

export default SearchBar;