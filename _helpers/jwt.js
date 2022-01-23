const expressJwt = require("express-jwt");
const config = require("config.json");
const userService = require("./user.service");
const colors = require("colors");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
      "/song-preview/",
      "/users/add",
      "/projects",
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    console.log(`User doesn't exist`);
    return done(null, true);
  }
  console.log(`auth error`.red);
  done();
}
