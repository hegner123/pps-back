const config = require("config.json");
const mongoose = require("mongoose");
const db = require("_helpers/db");
const Projects = db.Project;

module.exports = {
  getAll,
  getById,
  updateCell,
  delete: _delete,
};

async function getAll() {
  return await Projects.find();
}

async function getById(id) {
  return await Projects.find({ members: id });
}

async function updateCell({ project, song, instrument, status, cellId, user }) {
  let update;

  if (status === "Complete") {
    update = "Incomplete";
  } else {
    update = "Complete";
  }
  let activity = {
    action: update,
    project: project,
    song: song,
    instrument: instrument,
    misc: cellId,
  };
  console.log(activity);
  await Projects.updateOne(
    {
      $and: [
        { _id: project },
        {
          songs: {
            $elemMatch: {
              _id: song,
              song_status: { $elemMatch: { _id: cellId } },
            },
          },
        },
      ],
    },
    { $set: { "songs.$[s].song_status.$[i].status": update } },
    {
      arrayFilters: [{ "s._id": song }, { "i.instrument": instrument }],
      multi: true,
    }
  );

  console.log(addActivity(project, user, activity));

  return [cellId, update];
}

async function _delete(id) {
  return await Projects.findByIdAndRemove({ _id: id });
}

async function addActivity(project, userId, activity) {
  return  Projects.updateOne(
    { _id: project },
    {
      $push: {
        recent_activity: {
          $each: [
            {
              user: userId,
              activity: activity,
            },
          ],
          $slice: 10,
          $sort: -1,
        },
      },
    }
  );
}
