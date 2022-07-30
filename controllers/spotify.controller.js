import express from "express";
const router = express.Router();
import Spotify from "node-spotify-api";
import { spotifyKeys } from "../keys.js";

const spotify = new Spotify(spotifyKeys);

router.route("/song/:song").get(spotifySearch);

function spotifySearch(req, res) {
  let search = req.params.song.replace(/-/g, " ");

  spotify.search({ type: "track", query: search }).then((results) => {
    const previews = [];
    results.tracks.items.map((item) => {
      let track = {
        id: item.id,
        title: item.name,
        artist: item.artists,
        preview: item.preview_url,
      };
      previews.push(track);
    });
    res.json(previews);
  });
}

export { router as spotifyRouter };
