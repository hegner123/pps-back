const router = require("express").Router();
const spotifyController = require("../../controllers/spotifyController");


// Matches with "/song-preview/"
router.route("/:search")
  .get(spotifyController.spotifySearch)

  module.exports = router;