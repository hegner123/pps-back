require('rootpath')();
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const errorHandler = require('./_helpers/error-handler');
require('dotenv').config();

const routes = require("./routes");
app.use(cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(jwt());

app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
// // ... other app.use middleware
// app.use(express.static(path.join(__dirname, "client", "build")));
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});