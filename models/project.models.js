import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  companyName: String,
  members: [
    {
      id: { type: String, required: true },
      userName: { type: String, required: true },
    },
  ],
  projectTitle: { type: String, required: true },
  projectSlug: { type: String, required: true },
  songs: [
    {
      songTitle: String,
      songArrangements: { type: Array, default: [] },
      songStatus: [
        {
          instrument: { type: String, required: true },
          status: { type: String, required: true },
        },
      ],
      songLyrics: String,
      songKey: String,
      songBpm: Number,
      songReferences: { type: Array, default: [] },
    },
  ],
  projectArrangement: [
    {
      instruments: { type: Array, default: [] },
    },
  ],

  recentActivity: [
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
    { timestamps: { createdAt: "created_at" } },
  ],
});

const Projects = mongoose.model("projects", ProjectSchema);
export { Projects };
