const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  companyName: String,
  members: { type: Array, default: [], required: true },
  projectTitle: { type: String, required: true },
  projectSlug: { type: String, required: true },
  songs: [
    new Schema({
      song_title: String,
      song_arrangements: { type: Array, default: [] },
      song_status: [
        new Schema({
          instrument: String,
          status: String,
        }),
      ],
      song_lyrics: String,
      song_key: String,
      song_bpm: Number,
      song_references: { type: Array, default: [] },
    }),
  ],

  recent_activity: [
    new Schema(
      {
        user: String,
        activity: {
          action: String,
          project: String,
          song: String,
          instrument: String,
          misc: String,
        },
      },
      { timestamps: { createdAt: "created_at" } }
    ),
  ],
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
