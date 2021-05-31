const express = require('express');
const router = express.Router();
const projectService = require('../_helpers/project.service');
const Project = require('../models/project.models');

router.put('/project/:project/song/:song/instrument/:instrument/status/:status/id/:id', changeCellStatus);
router.get('/', getAll)
      .post('/', create);
router.get('/:id', findById);
router.post('/:id', pushSong);



module.exports = router;

function changeCellStatus(req, res, next){
  console.log(req.body)
// res.send('Got a PUT request at ' + req.params.user + ' ' + req.params.project +  ' ' + req.params.song + ' ' + req.params.instrument)
projectService.updateCell({
  project:req.params.project,
  song:req.params.song,
  instrument:req.params.instrument,
  status: req.params.status,
  cellId:req.params.id,
  user: req.body.user
}
  )
    .then(data => res.json(data))
    .catch(err => next(err));

}

function getAll(req, res, next) {
  projectService.getAll(req.body)
    .then(projects => res.json(projects))
    .catch(err => next(err));
}

function findById(req, res, next) {
  projectService
    .getById(req.params.id)
    .then(project => project ? res.json(project) : res.sendStatus(404))
    .catch(err => next(err));
}

function create(req, res) {
  projectService
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}


function pushSong(req, res) {
  console.log(req.body)
  const songTitle = req.body.song_title;
  const songKey = req.body.song_key;
  const songBpm = req.body.song_bpm;
  const songLyrics = req.body.song_lyrics;
  const songReferences = req.body.song_references;
  const songArrangement = req.body.song_arrangements;
  const songStatus = req.body.song_status;

  const newSong = {
    song_title: songTitle,
    song_key: songKey,
    song_bpm: songBpm,
    song_lyrics: songLyrics,
    song_references: songReferences,
    song_arrangements: songArrangement,
    song_status: songStatus
  };

  projectService.update({
    projectTitle: req.params.id
    }, {
      $push: {
        songs: newSong
      }
    })
    .then(dbModel => console.log(res.json(dbModel)))
    .catch(err => res.status(422).json(err));
}





// router
//   .get('/:id', findById)
//   .delete('/:id', remove)
//   .put('/:id', update);

// router
//   .put('/song/arrangement/:id', update);

// router
//   .get('/note/add/:id', findById)
//   .put('/note/add/:id', addNote)

// router
//   .get('/note/remove/:id', findById)
//   .put('/note/remove/:id', removeNote)







// function update(req, res) {
//   projectService
//     .findOneAndUpdate({
//       _id: req.params.id
//     }, req.body)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// }

// function addNote(req, res) {
//   projectService
//     .findOneAndUpdate({
//       _id: req.params.id
//     }, {
//       $push: {
//         ['songs.' + [req.body.index] + '.song_notes']: req.body.newNote
//       }
//     })
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// }

// function removeNote(req, res) {
//   projectService
//     .findOneAndUpdate({
//       _id: req.params.id
//     }, {
//       $pull: {
//         ['songs.' + [req.body.index] + '.song_notes']: {
//           _id: req.body.id
//         }
//       }
//     })
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// }



// function remove(req, res) {
//   projectService
//     .findById({
//       _id: req.params.id
//     })
//     .then(dbModel => dbModel.remove())
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// }

