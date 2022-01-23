const express = require("express");
const router = express.Router();
const db = require("_helpers/db");
const Projects = db.Project;

router.put("/update", changeCellStatus);
router.get("/:id", getProjects);
router.post("/", createProject).delete("/", deleteProject);
router.put("/songs", createSong).delete("/songs", deleteSong);

module.exports = router;

function getProjects(req, res, next) {
  Projects.find({ "members.id": req.params.id })
    .then((project) => (project ? res.json(project) : res.sendStatus(404)))
    .catch((err) => next(err));
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
      console.log(dbModel);
      projectServiceaddActivity(
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
  const song = req.body.song;
  const projectId = req.body.projectId;
  console.log(song);

  Projects.findOneAndUpdate(
    { _id: projectId },
    { $pull: { songs: { _id: song } } }
  )
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));

  // Projects.findOneAndUpdate(
  //   {
  //     _id: userId,
  //   },
  //   { $pull: { songs: { _id: song } } }
  // )
  //   .then((dbModel) => res.json(dbModel))
  //   .catch((err) => res.status(422).json(err));
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
