const express = require("express");
const router = express.Router();
const projectService = require("../_helpers/project.service");
const Project = require("../models/project.models");
const db = require("_helpers/db");
const Projects = db.Project;

router.put(
  "/project/:project/song/:song/instrument/:instrument/status/:status/id/:id",
  changeCellStatus
);
router.get("/", getAll).post("/", createProject).delete("/", deleteProject);
router.get("/:id", findById);
router.put("/songs", pushSong).delete("/songs", deleteSong);

module.exports = router;

function getAll(req, res, next) {
  projectService
    .getAll(req.body)
    .then((projects) => res.json(projects))
    .catch((err) => next(err));
}

function findById(req, res, next) {
  projectService
    .getById(req.params.id)
    .then((project) => (project ? res.json(project) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function createProject(req, res) {
  Project.create(req.body.newProject)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

function deleteProject(req, res) {
  projectService
    .delete(req.body.project.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

function changeCellStatus(req, res, next) {
  console.log(req.body.user);
  projectService
    .updateCell({
      project: req.params.project,
      song: req.params.song,
      instrument: req.params.instrument,
      status: req.params.status,
      cellId: req.params.id,
      user: req.body.user,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function pushSong(req, res) {
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

function deleteSong(req, res) {
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
