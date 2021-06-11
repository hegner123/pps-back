const router = require("express").Router();
const Spotify = require('node-spotify-api');
const keys = require( '../keys');
const spotify = new Spotify(keys.spotify)

router.route("/song/:song").get(spotifySearch)


  module.exports = router;

function spotifySearch (req, res){

   let  search = req.params.song.replace(/-/g, ' ')

spotify.search({ type: 'track', query: search })
  .then(results => {
    const previews = [];
    results.tracks.items.map(item => {
      let track ={
      id: item.id,
      title: item.name,
      artist: item.artists,
      preview: item.preview_url
      }
      previews.push(track);
      
    });
    res.json(previews)}
    )
}




