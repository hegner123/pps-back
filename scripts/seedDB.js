const mongoose = require("mongoose");
const Project = require("../models/project.models");


const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGOprojects_URI || "mongodb://localhost/pps-backend" , connectionOptions);
mongoose.Promise = global.Promise;

const projectSeed = [
  {
    projectTitle: "Project1",
    songs: [{song_title: "Song Title 1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_status: {guitar: "Incomplete", piano: "Incomplete", drum: "Complete"},
            song_key: "Fm",
            song_bpm: 150,
            song_notes: [{
              noteTitle: "Song Title 1-1 - guitar",
              noteBody:"note for song 1 guitar",
              noteStatus: "Incomplete"
            },
            {
              noteTitle: "Song Title 1-1 - piano",
              noteBody:"note for song 1 piano",
              noteStatus: "Incomplete"
            },
            {
              noteTitle: "Song Title 1-1 - drum",
              noteBody:"note for song 1 drum",
              noteStatus: "Complete"
            },
          ]
          },
          {song_title: "Song Title 1-2 Piano Solo",
            song_arrangements: ["piano"],
            song_status: {piano: "Complete"},
            song_key: "Am",
            song_bpm: 110,
            song_notes: [{
              noteTitle: "Song Title 1-2 - piano",
              noteBody:"note for song 1-2 piano solo",
              noteStatus: "Complete"
            }
          ]
          },
        ],
    members: ["things 1", "hegner123@gmail.com"],
    total_arrangements: 3,
    companyName: "ABC"
  },
  {
    projectTitle: "Project2",
    songs: [
      { song_title: "Song Title 2-1",
        song_arrangements: ["guitar1", "orchestra", "drum", "guitar2", "guitar3"],
        song_key: "Bm",
        song_bpm: 120,
        song_notes: [{
          noteTitle: "Song Title 2-1 - guitar1",
          noteBody:"there's no note 2-1",
          noteStatus: "Complete"
        },
        {
          noteTitle: "Song Title 2-1 orchestra ",
          noteBody:"2-1 orchestra note",
          noteStatus: "Complete"
        },
        {
          noteTitle: "Song Title 2-1 drum ",
          noteBody:"2-1 drum note",
          noteStatus: "Incomplete"
        },
        {
          noteTitle: "Song Title 2-1 guitar2 ",
          noteBody:"2-1 guitar2 note",
          noteStatus: "Complete"
        },
        {
          noteTitle: "Song Title 2-1 guitar3",
          noteBody:"2-1 guitar3 note",
          noteStatus: "Complete"
        },
      ]
      },
      { song_title: "Song Title 2-2",
        song_arrangements: ["drum", "orchestra", "trumpet"],
        song_key: "Am",
        song_bpm: 90,
        song_notes: [{
          noteTitle: "Song Title 2-2 - drum",
          noteBody:"]note 2-2 drum",
          noteStatus: "Incomplete"
        },
        {
          noteTitle: "Song Title 2-2 - orchestra",
          noteBody:"note 2-2 orchestra",
          noteStatus: "Incomplete"
        },
        {
          noteTitle: "Song Title 2-2 - trumpet",
          noteBody:"there's no note 2-2 trumpet",
          noteStatus: "Incomplete"
        }]
      }
    ],
    members: ["member 1", "member 2"],
    total_arrangements: 6,
    companyName: "Verizon"
  },
  {
    projectTitle: "Project3",
    songs: [{song_title: "Song Title 3-1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_key: "Fm",
            song_bpm: 150,
            song_notes: [{notes:"there's no note"}]
          }],
    members: ["thing 3-1", "thing 3-2"],
    total_arrangements: 3,
    companyName: "Netflix"
  },
  {
    projectTitle: "Project4",
    songs: [{song_title: "Song Title 4-1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_key: "Am",
            song_bpm: 150,
            song_notes: [{notes:"there's no note"}]
          }],
    members: ["thing 3-1", "thing 3-2"],
    total_arrangements: 3,
    companyName: "Netflix"
  },
  {
    projectTitle: "Project5",
  songs: [{
      song_title: "Magic Mountain",
      song_arrangements: ["bass1", "drum" , "guitar1", "guitar2"],
      song_key: "G",
      song_bpm: 80,
      song_notes: [{
          notes: "there's no note"
      }],
      song_status: {
          bass1: "Complete",
          drum: "Complete",
          guitar1: "Complete",
          guitar2: "Complete"
      }
  },
  {
      song_title: "Rainbow",
      song_arrangements: ["bass1", "bgv", "drum", "guitar1", "guitar2", "vocals"],
      song_key: "G",
      song_bpm: 80,
      song_notes: [{
          notes: "there's no note"
      }],
      song_status: {
          bass1: "Complete",
          bgv: "Incomplete",
          drum: "Complete",
          guitar1: "Complete",
          guitar2: "Incomplete",
          vocals: "Incomplete"
  }
},{
  song_title: "No Hardcore Dancing In The Living Room",
  song_arrangements: ["drum", "guitar1",   "guitar2", "guitar3", "orchestra"],
  song_key: "Bm",
  song_bpm: 120,
  
  song_status: {

      drum: "Complete",
      guitar1: "Complete",
      guitar2: "Complete",
      guitar3 : "Incomplete",
      orchestra : "Complete"
  }
},
{
  song_title: "Song Title 2-2",
  song_arrangements: ["drum", "orchestra", "trumpet"],
  song_key: "Am",
  song_bpm: 90,
  
  song_status: {

      drum: "Complete",
      trumpet: "Incomplete",
      orchestra : "Complete"
  }
}],
  members: ["michael", "thing 5-2"],
  total_arrangements: 6,
  companyName: "Netflix"
  }]
;

Project.deleteMany({})
.then(res => {
  console.log(res);
  Project.insertMany(projectSeed)

.then(data => {
  console.log(data + " records inserted!");
  process.exit(0);
})})

  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // .remove({})