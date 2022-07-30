import express from "express";
import { Projects } from "../_helpers/db.js";

const router = express.Router();

router.put("/update", changeCellStatus);
router.get("/:id", getProjects);
router.post("/", createProject).delete("/", deleteProject);
router.put("/songs", createSong).delete("/songs", deleteSong);

export { router as projectRouter };

function getProjects(req, res, next) {
  Projects.find({ "members.id": req.params.id })
    .then((project) => (project ? res.json(project) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getProject(projectId) {
  Projects.findOne({
    _id: projectId,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

function createProject(req, res) {
  let activity = {
    action: "New Project",
    project: req.body.newProject.projectTitle,
    song: "",
    instrument: "",
    misc: "",
  };

  Projects.create(req.body.newProject)
    .then((dbModel) => {
      projectService.addActivity(
        dbModel._id,
        dbModel.members[0],
        activity,
        "New Project"
      );
      res.json(dbModel);
    })
    .catch((err) => res.status(422).json(err));
}

function deleteProject(req, res) {
  Projects.deleteOne({ _id: req.body.id })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
}

function createSong(req, res) {
  let userId = req.body.newSong.id;
  let song = req.body.newSong.song;
  let songStatus = [];
  let songArrangement = [];

  function Instrument(instrument) {
    this.instrument = instrument;
    this.status = "Incomplete";
  }

  song.arrangement.forEach((inst) => {
    let newInstrument = new Instrument(inst.instrument);
    songStatus.push(newInstrument);
    songArrangement.push(inst.instrument);
  });

  const newSong = {
    song_title: song.songTitle,
    song_references: song.references,
    song_arrangements: songArrangement,
    song_status: songStatus,
  };

  Projects.findOneAndUpdate(
    {
      _id: song.id,
    },
    {
      $push: {
        songs: newSong,
      },
    }
  )
    .then((dbModel) => {
      console.log(dbModel);
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
  const options = {
    project: req.body.project,
    song: req.body.song,
    instrument: req.body.instrument,
    status: req.body.status,
    id: req.body.id,
  };

  let update;

  if (options.status === "Complete") {
    update = "Incomplete";
  } else {
    update = "Complete";
  }
  Projects.updateOne(
    {
      _id: options.project,
    },
    { $set: { "songs.$[s].song_status.$[i].status": update } },
    {
      arrayFilters: [
        { "s._id": options.song },
        { "i.instrument": options.instrument },
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
    project: options.project,
    song: options.song,
    instrument: options.instrument,
    misc: options.cellId,
  };

  // addActivity(params.project, req.body.user, activity, "update");
}
