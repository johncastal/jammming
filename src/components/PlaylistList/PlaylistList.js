import './PlaylistList.css';

const PlaylistList = ({ namesPlayList,idPlaylists,itemsPlaylist }) => {

  // To set dataPlaylist variable that depends of namesPlayList that is async
  let dataPlaylist = {} 
  if (Array.isArray(namesPlayList)) {
    dataPlaylist = namesPlayList.map((name, index) => ({
      name: name,
      id: idPlaylists[index],
    }));
  }

  // Handle the tracks in the play list selected
  const handleNamePlaylist = (id) => {
    itemsPlaylist(id)
  }

    return (
      <div className='PlaylistList'>
        <h2>Playlists</h2>
        <div className='list'>
          {Array.isArray(dataPlaylist) &&
            dataPlaylist.map((playlist) => (
              <h3 key={playlist.name} onClick={()=>handleNamePlaylist(playlist.id)}>
                {playlist.name}
              </h3>
            ))}
        </div>
      </div>
    );
    //return (
    //  <div className='PlaylistList'>
    //    <h2>Playlists</h2>
    //    <div className='list'>
    //      {Array.isArray(namesPlayList) &&
    //        namesPlayList.map((name) => (
    //          <h3 key={name + '-'} onClick={()=>handleNamePlaylist(name)}>
    //            {name}
    //          </h3>
    //        ))}
    //    </div>
    //  </div>
    //);
  };
  

export default PlaylistList;