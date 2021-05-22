require('rootpath')();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./controllers/users.controller'));
app.use('/projects',require('./controllers/project.controller'));

// global error handler
app.use(errorHandler);
// // ... other app.use middleware
// app.use(express.static(path.join(__dirname, "client", "build")));
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});