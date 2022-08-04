import mongoose from "mongoose";
import { Projects } from "../models/project.models.js";

const userId = ["60f17f1576fc292fbc8f42e3", "61dc403791ad61df2652bb1d"];
const userName = ["testUser", "demo"];
console.log(userId[0]);

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(
  process.env.MONGOprojects_URI || "mongodb://localhost/pps-backend",
  connectionOptions
);
mongoose.Promise = global.Promise;

const projectSeed = [
  {
    companyName: "ABC",
    members: [
      { id: userId[0], userName: userName[0] },
      { id: userId[1], userName: userName[1] },
    ],
    projectTitle: "Blink-183",
    projectSlug: "blink-183",
    songs: [
      {
        songTitle: "song-title-1",
        songArrangements: ["guitar", "piano", "drum"],
        songStatus: [
          { instrument: "guitar", status: "Incomplete" },
          { instrument: "piano", status: "Incomplete" },
          { instrument: "drum", status: "Complete" },
        ],
        songKey: "Fm",
        songBpm: 150,
      },
      {
        songTitle: "Song Title 1-2 Piano Solo",
        songArrangements: ["piano"],
        songStatus: [{ instrument: "piano", status: "Complete" }],
        songKey: "Am",
        songBpm: 110,
      },
    ],
  },
  {
    companyName: "Verizon",
    members: [{ id: userId[0], userName: userName[0] }],
    projectTitle: "Project2",
    projectSlug: "project2",
    songs: [
      {
        songTitle: "Song Title 2-1",
        songArrangements: [
          "guitar1",
          "orchestra",
          "drum",
          "guitar2",
          "guitar3",
        ],
        songKey: "Bm",
        songBpm: 120,
        songTitle: "Song Title 2-2",
        songArrangements: ["drum", "orchestra", "trumpet"],
      },
    ],
  },
  {
    companyName: "Netflix",
    members: [{ id: userId[0], userName: userName[0] }],
    projectTitle: "Project3",
    projectSlug: "project3",
    songs: [
      {
        songTitle: "Song Title 3-1",
        songArrangements: ["guitar", "piano", "drum"],
        songKey: "Fm",
        songBpm: 150,
        songStatus: [
          { instrument: "guitar", status: "Incomplete" },
          { instrument: "piano", status: "Incomplete" },
          { instrument: "drum", status: "Complete" },
        ],
      },
    ],
  },
  {
    companyName: "Netflix",
    members: [{ id: userId[0], userName: userName[0] }],
    projectTitle: "Johnny Got Dump",
    projectSlug: "johnny-got-dump",
    songs: [
      {
        songTitle: "Song Title 4-1",
        songArrangements: ["guitar", "piano", "drum"],
        songKey: "Am",
        songBpm: 150,
        song_notes: [{ notes: "there's no note" }],
        songStatus: [
          { instrument: "guitar", status: "Incomplete" },
          { instrument: "piano", status: "Incomplete" },
          { instrument: "drum", status: "Complete" },
        ],
      },
      {
        songTitle: "Song Title 6",
        songArrangements: ["guitar", "piano", "drum"],
        songKey: "Am",
        songBpm: 150,
        song_notes: [{ notes: "there's no note" }],
        songStatus: [
          { instrument: "guitar", status: "Incomplete" },
          { instrument: "piano", status: "Incomplete" },
          { instrument: "drum", status: "Incomplete" },
        ],
      },
    ],
  },
  {
    companyName: "Netflix",
    members: [{ id: userId[0], userName: userName[0] }],
    projectTitle: "Corn off the Cob",
    projectSlug: "corn-off-the-cob",
    songs: [
      {
        songTitle: "Magic Mountain",
        songArrangements: ["bass1", "drum", "guitar1", "guitar2"],
        songKey: "G",
        songBpm: 80,
        songStatus: [
          { instrument: "bass1", status: "Incomplete" },
          { instrument: "drum", status: "Incomplete" },
          { instrument: "guitar1", status: "Incomplete" },
          { instrument: "guitar2", status: "Complete" },
        ],
      },
      {
        songTitle: "Rainbow",
        songArrangements: [
          "bass1",
          "bgv",
          "drum",
          "guitar1",
          "guitar2",
          "vocals",
        ],
        songKey: "G",
        songBpm: 80,
        songStatus: [
          { instrument: "bass1", status: "Incomplete" },
          { instrument: "bgv", status: "Incomplete" },
          { instrument: "drum", status: "Incomplete" },
          { instrument: "guitar1", status: "Complete" },
          { instrument: "guitar2", status: "Complete" },
          { instrument: "vocals", status: "Complete" },
        ],
      },
      {
        songTitle: "No Hardcore Dancing In The Living Room",
        songArrangements: [
          "drum",
          "guitar1",
          "guitar2",
          "guitar3",
          "orchestra",
        ],
        songKey: "Bm",
        songBpm: 120,
        songStatus: [
          { instrument: "drum", status: "Incomplete" },
          { instrument: "guitar1", status: "Incomplete" },
          { instrument: "guitar2", status: "Incomplete" },
          { instrument: "guitar3", status: "Complete" },
          { instrument: "orchestra", status: "Complete" },
        ],
      },
      {
        songTitle: "Song Title 2-2",
        songArrangements: ["drum", "orchestra", "trumpet"],
        songKey: "Am",
        songBpm: 90,
        songStatus: [
          { instrument: "drum", status: "Complete" },
          { instrument: "orchestra", status: "Complete" },
          { instrument: "trumpet", status: "Complete" },
        ],
      },
    ],
  },
];
Projects.deleteMany({})
  .then((res) => {
    console.log(res);
    Projects.insertMany(projectSeed).then((data) => {
      console.log(data + " records inserted!");
      process.exit(0);
    });
  })

  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// .remove({})
