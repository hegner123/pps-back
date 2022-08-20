import "dotenv/config";
import colors from "colors";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import cors from "cors";

import { jwt } from "./_helpers/jwt.js";
import { errorHandler } from "./_helpers/error-handler.js";
import { controllerSendMail } from "./controllers/mail.controller.js";
import { userRouter } from "./controllers/users.controller.js";
import { projectRouter } from "./controllers/project.controller.js";
import { spotifyRouter } from "./controllers/spotify.controller.js";
import { verifyEmail } from "./_helpers/node.mailer.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(jwt());
// email.controllerSendMail('Michael', '123456789');

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/song-preview", spotifyRouter);

// email.controllerSendMail();
// global error handler
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

const server = app.listen(port, function () {
  console.log(colors.brightBlue(`Server listening on port ${port} 🥳`));
  console.log(colors.brightBlue(`\nhttp://localhost:${port} 🔗`));
});

const wss = new WebSocketServer({
  clientTracking: false,
  noServer: true,
});

server.on("upgrade", function (request, socket, head) {
  console.log("Parsing session from request...");

  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", function (ws, request) {
  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
        console.log(data, { binary: isBinary });
      }
    });
  });

  ws.on("close", function () {
    map.delete(userId);
  });
});
