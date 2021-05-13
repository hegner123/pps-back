const router = require("express").Router();
const spotifyController = require("../../controllers/spotify.controller");


// Matches with "/song-preview/"
router.route("/:search")
  .get(spotifyController.spotifySearch)

  module.exports = router;