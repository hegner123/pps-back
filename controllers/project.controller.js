import express from "express";
import { NewSong } from "../_constructors/newSong.js";
import { Projects } from "../_helpers/db.js";

const router = express.Router();

router.put("/update", changeCellStatus);
router.get("/:id", getProjects).put("/:id/member", addUser);
router.post("/", createProject).delete("/", deleteProject);
router.put("/songs", createSong).delete("/songs", deleteSong);

export { router as projectRouter };

function getProjects(req, res, next) {
  console.log(req.params.id);
  Projects.find({ "members.id": req.params.id })
    .then((project) => (project ? res.json(project) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function createProject(req, res) {
  Projects.create(req.body.newProject)
    .then((dbModel) => {
      res.json(dbModel);
    })
    .catch((err) => res.status(422).json(err));
}

function addUser(req, res) {
  const newUser = {
    id: req.body.id,
    userName: req.body.userName,
  };
  Projects.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { members: { id: newUser.id, userName: newUser.userName } } }
  )
    .then((dbModel) => {
      res.send(dbModel);
    })
    .catch((err) => res.status(422).json(err));
}

function deleteProject(req, res) {
  Projects.deleteOne({ _id: req.body.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

function createSong(req, res) {
  let song = req.body.newSong.song;
  let newSong = new NewSong(song);
  console.log(newSong);

  Projects.findOneAndUpdate({ _id: song.id }, { $push: { songs: newSong } })
    .then((dbModel) => {
      res.send(dbModel);
    })
    .catch((err) => res.status(422).json(err));
}

function deleteSong(req, res) {
  const song = req.body.song;
  const projectId = req.body.projectId;

  Projects.updateOne({ _id: projectId }, { $pull: { songs: { _id: song } } })
    .then((dbModel) => {
      Projects.findOne({
        _id: projectId,
      }).then((data) => {
        res.json(data);
      });
    })
    .catch((err) => res.status(422).json(err));
}

function changeCellStatus(req, res, next) {
  const cellOptions = {
    project: req.body.project,
    song: req.body.song,
    instrument: req.body.instrument,
    status: req.body.status,
    id: req.body.id,
  };

  let update;

  if (cellOptions.status === "Complete") {
    update = "Incomplete";
  } else {
    update = "Complete";
  }
  Projects.updateOne(
    {
      _id: cellOptions.project,
    },
    { $set: { "songs.$[s].songStatus.$[i].status": update } },
    {
      arrayFilters: [
        { "s._id": cellOptions.song },
        { "i.instrument": cellOptions.instrument },
      ],
      multi: true,
    }
  )
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => next(err));
}
