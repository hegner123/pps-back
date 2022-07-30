import expressJwt from "express-jwt";
import { config } from "../config.js";
import { userService } from "./user.service.js";

export function jwt() {
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
