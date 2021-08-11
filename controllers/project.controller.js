const express = require("express");
const router = express.Router();
const Project = require("../models/project.models");
const db = require("_helpers/db");
const Projects = db.Project;

router.put(
  "/project/:project/song/:song/instrument/:instrument/status/:status/id/:id",
  changeCellStatus
);
router.post("/", createProject).delete("/", deleteProject);
router.get("/:id", find);
router.put("/songs", pushSong).delete("/songs", deleteSong);

module.exports = router;

function find(req, res, next) {
  Projects.find({ "members.id": req.params.id })
    .then((project) => (project ? res.json(project) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function createProject(req, res, next) {
  // let activity = {
  //   action: "New Project",
  //   project: req.body.newProject.projectTitle,
  //   song: "",
  //   instrument: "",
  //   misc: "",
  // };

  Projects.create(req.body.newProject)
    .then((dbModel) => {
      console.log(dbModel);
      // projectServiceaddActivity(
      //   dbModel._id,
      //   dbModel.members[0],
      //   activity,
      //   "New Project"
      // );
      res.json(dbModel);
    })
    .catch((err) => res.status(422).json(err));
}

function deleteProject(req, res, next) {
  projectService
    .delete(req.body.project.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

function changeCellStatus(req, res, next) {
  const params = req.params;

  let update;

  if (params.status === "Complete") {
    update = "Incomplete";
  } else {
    update = "Complete";
  }
  Projects.updateOne(
    {
      _id: params.project,
    },
    { $set: { "songs.$[s].song_status.$[i].status": update } },
    {
      arrayFilters: [
        { "s._id": params.song },
        { "i.instrument": params.instrument },
      ],
      multi: true,
    }
  )
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => next(err));

  let activity = {
    action: update,
    project: params.project,
    song: params.song,
    instrument: params.instrument,
    misc: params.cellId,
  };

  // addActivity(params.project, req.body.user, activity, "update");
}

function pushSong(req, res, next) {
  let songStatus = [];
  let songArrangement = [];
  function Instrument(instrument) {
    this.instrument = instrument;
    this.status = "Incomplete";
  }
  req.body.newSong.arrangement.forEach((inst) => {
    let data = new Instrument(inst.instrument);
    songStatus.push(data);
    songArrangement.push(inst.instrument);
  });
  const newSong = {
    song_title: req.body.newSong.songTitle,
    song_references: req.body.newSong.references,
    song_arrangements: songArrangement,
    song_status: songStatus,
  };
  Project.findOneAndUpdate(
    {
      _id: req.body.newSong.id,
    },
    {
      $push: {
        songs: newSong,
      },
    }
  )
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

function deleteSong(req, res, next) {
  Projects.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    { $pull: { songs: { _id: req.body.songs } } }
  )
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

// recent_activity: [
//     new Schema(
//       {
//         user: String,
//         activity: {
//           action: String,
//           project: String,
//           song: String,
//           instrument: String,
//           misc: String,
//         },
//       },
//       { timestamps: { createdAt: "created_at" } }
//     ),

function addActivity(project, userId, activity, type) {
  console.log(
    Projects.updateOne(
      { _id: project },
      {
        $push: {
          recent_activity: {
            $each: [
              {
                user: userId,
                type: type,
                read: false,
                activity: activity,
              },
            ],
            $slice: 10,
            $sort: -1,
          },
        },
      }
    )
  );
}
