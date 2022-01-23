﻿require("rootpath")();
const colors = require("colors");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const email = require("./controllers/mail.controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(jwt());

app.use("/users", require("./controllers/users.controller"));
app.use("/projects", require("./controllers/project.controller"));
app.use("/song-preview", require("./controllers/spotify.controller"));
// email.controllerSendMail();
// global error handler
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.log(colors.brightBlue(`Server listening on port ${port} 🥳`));
});
