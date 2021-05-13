const Spotify = require('node-spotify-api');
const keys = require( '../keys');
const spotify = new Spotify(keys.spotify)


module.exports = {
spotifySearch: function(req, res){

   let  search = req.params.search;

spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      let resultData = data.tracks.items
      let songArtist = data.tracks.items[0].album.artists[0].name;
      let songName = data.tracks.items[0].name;
      let songLink = data.tracks.items[0].external_urls.spotify;
      const trackData = {
        results: resultData,
        songLink: songLink,
        title: songName,
        artist: songArtist
      }
      res.json(trackData);
    }
  });
}

}


