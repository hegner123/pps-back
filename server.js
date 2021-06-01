require('rootpath')();
const express = require("express");
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(jwt())

app.use('/users', require('./controllers/users.controller'));
app.use('/projects',require('./controllers/project.controller'));
app.use('/song-preview', require('./controllers/spotify.controller'));

// global error handler
app.use(errorHandler);


const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});