const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  companyName: String,
  members: [
    new Schema({
      id: { type: String, required: true },
      username: { type: String, required: true },
    }),
  ],
  projectTitle: { type: String, required: true },
  projectSlug: { type: String, required: true },
  songs: [
    new Schema({
      song_title: String,
      song_arrangements: { type: Array, default: [] },
      song_status: [
        new Schema({
          instrument: { type: String, required: true },
          status: { type: String, required: true },
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
        user: { type: String, required: true },
        type: { type: String, required: true },
        read: Boolean,
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
