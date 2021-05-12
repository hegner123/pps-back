# pro-project-studio

## Purpose
    * Purpose of the app is to create project management system for audio recording engineers. It's one stop place for engineer to update status of each songs and to communicate the status with their clients. 

## High level overview of organization
    - Once the client gets in contact with the recording studio, the audio engineer will log in and create project and add email address of members to access that particular project
    - When a client registers and logs in, it will display list of projects associated with their email address
    - Client will add songs & instruments for each song
    - Audio engineer will change the status of each instrument on grid using drop down menu and add any notes associated with a song
    - All members will have access to view/edit/delete notes

## Link to deployed version
    * https://pro-project-studio.herokuapp.com/

## Technologies used
    * API - Spotify was used to link song references when adding a song to the project
    * axios.js
    * bcrypt
    * mongo database
    * node.js
    * passport.js
    * redux
    * react
    * react-data-grid
    * react-bootstrap
