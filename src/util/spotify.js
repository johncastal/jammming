const spotify = {
  async search(searchSong) {
    try {
      const response = await fetch('./musicLibrary.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      const matchingSongs = data.musicLibrary.songs.filter(song => song.title === searchSong);
      // Rest of your code
      return matchingSongs
    } catch (error) {
      console.log(error)
      console.error('Error:', error);
      return [];
    }
  },
  
  
  searchArray(searchSong) {
    const musicLibrary = {
      songs: [
        {
          uri: 1,
          title: "Imagine",
          author: "John Lennon",
          album: "Imagine",
        },
        {
          uri: 2,
          title: "Bohemian Rhapsody",
          author: "Queen",
          album: "A Night at the Opera",
        },
        {
          uri: 3,
          title: "Hotel California",
          author: "Eagles",
          album: "Hotel California",
        },
        {
          uri: 4,
          title: "Shape of You",
          author: "Ed Sheeran",
          album: "÷ (Divide)",
        },
        {
          uri: 5,
          title: "Rolling in the Deep",
          author: "Adele",
          album: "21",
        },
        {
          uri: 3,
          title: "Another One Bites the Dust",
          author: "Queen",
          album: "The Game"
        }
      ],
    };
    const matchingSongs = musicLibrary.songs.filter(song => {
      return (
          song.title === searchSong ||
          song.author === searchSong ||
          song.album === searchSong
          // Add more criteria as needed
      );
    });  
    return matchingSongs
  }
}

export default spotify;

