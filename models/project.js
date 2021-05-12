const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ProjectSchema = new Schema({
  title: { type: String, required: true },
  songs: [ new Schema ({
            song_title: String,
            song_arrangements: {type: Array, default: []},
            song_status: {type:Object},
            song_lyrics: String,
            song_key: String,
            song_bpm: Number,
            song_references:  {type: Array, default: []},
            song_notes: [new Schema ({
                  noteTitle: String,
                  noteBody: String,
            })]
        })],
  members: {type: Array, default: []},
  companyName: String
});

module.exports = Project = mongoose.model("projects", ProjectSchema);