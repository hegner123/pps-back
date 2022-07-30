import "dotenv/config";
const spotifyKeys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
};

const email = {
  user: process.env.EMAIL_USERNAME,
  pass: process.env.EMAIL_PASSWORD,
};

export { spotifyKeys, email };
