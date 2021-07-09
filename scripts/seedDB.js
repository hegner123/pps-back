const mongoose = require("mongoose");
const Project = require("../models/project.models");


const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGOprojects_URI || "mongodb://localhost/pps-backend" , connectionOptions);
mongoose.Promise = global.Promise;

const projectSeed = [
  {
    projectTitle: "Blink-183",
    projectSlug: "blink-183",
    songs: [{song_title: "song-title-1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_status: [{instrument:"guitar",
                          status: "Incomplete"},
                          { instrument:"piano",
                            status: "Incomplete"}, 
                          {instrument:"drum",
                           status: "Complete"}],
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
            song_status: [{instrument: "piano",
                            status: "Complete"}],
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
    members: ["things 1", "60e497a1279462f0bac92dab"],
    total_arrangements: 3,
    companyName: "ABC"
  },
  {
    projectTitle: "Project2",
    projectSlug: "project2",
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
    projectSlug: "project3",
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
    projectTitle: "Johnny Got Dump",
    projectSlug: "johnny-got-dump",
    songs: [{song_title: "Song Title 4-1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_key: "Am",
            song_bpm: 150,
            song_notes: [{notes:"there's no note"}],
            song_status: [{instrument:"guitar",
                          status: "Incomplete"},
                          { instrument:"piano",
                            status: "Incomplete"}, 
                          {instrument:"drum",
                          status: "Complete"}],
          }],
    members: ["thing 3-1", "60e497a1279462f0bac92dab"],
    total_arrangements: 3,
    companyName: "Netflix"
  },
  {
    projectTitle: "Corn off the Cob",
    projectSlug: "corn-off-the-cob",
  songs: [{
      song_title: "Magic Mountain",
      song_arrangements: ["bass1", "drum" , "guitar1", "guitar2"],
      song_key: "G",
      song_bpm: 80,
      song_notes: [{
          notes: "there's no note"
      }],
      song_status: [{instrument:"bass1",
      status: "Incomplete"},
      { instrument:"drum",
        status: "Incomplete"}, 
      {instrument:"guitar1",
       status: "Incomplete"},
       {instrument:"guitar2",
       status: "Complete"}],
  },
  {
      song_title: "Rainbow",
      song_arrangements: ["bass1", "bgv", "drum", "guitar1", "guitar2", "vocals"],
      song_key: "G",
      song_bpm: 80,
      song_notes: [{
          notes: "there's no note"
      }],
      song_status: [{instrument:"bass1",
      status: "Incomplete"},
      { instrument:"bgv",
        status: "Incomplete"}, 
      {instrument:"drum",
       status: "Incomplete"},
       {instrument:"guitar1",
       status: "Complete"},
       {instrument:"guitar2",
       status: "Complete"},
       {instrument:"vocals",
       status: "Complete"}]
},{
  song_title: "No Hardcore Dancing In The Living Room",
  song_arrangements: ["drum", "guitar1",   "guitar2", "guitar3", "orchestra"],
  song_key: "Bm",
  song_bpm: 120,
  
  song_status: [{instrument:"drum",
                status: "Incomplete"},
                { instrument:"guitar1",
                  status: "Incomplete"}, 
                {instrument:"guitar2",
                status: "Incomplete"},
                {instrument:"guitar3",
                status: "Complete"},
                {instrument:"orchestra",
                status: "Complete"}
                ]
},
{
  song_title: "Song Title 2-2",
  song_arrangements: ["drum", "orchestra", "trumpet"],
  song_key: "Am",
  song_bpm: 90,
  
  song_status: [{instrument:"drum",
                  status: "Complete"},
                  {instrument:"orchestra",
                  status: "Complete"},
                  {instrument:"trumpet",
                  status: "Complete"}]
}],
  members: ["60e497a1279462f0bac92dab", "thing 5-2"],
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