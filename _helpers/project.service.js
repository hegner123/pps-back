const config = require('config.json');
const db = require('_helpers/db');
const Projects = db.Project;

module.exports = {
    getAll,
    getById,
    create,
    updateCell,
    delete: _delete
};



async function getAll() {
    return await Projects.find();
}

async function getById(id) {
    return await Projects.find({members:id});
}

async function create(ProjectsParam) {
    // validate
    if (await Projects.findOne({ ProjectsName: ProjectsParam.ProjectsName })) {
        throw 'ProjectsName "' + ProjectsParam.ProjectsName + '" is already taken';
    }

    const Projects = new Projects(ProjectsParam);

    // save Projects
    await Projects.save();
}

async function updateCell({project, song, instrument, status, cellId}) {
    let update;
    if (status === "Complete"){
        update ="Incomplete"
    } else {
        update ="Complete"
    }
    return await Projects.updateOne({$and:[{"_id" : project},
    { "songs":{ $elemMatch:{"_id" : song,  "song_status":{ $elemMatch:{"_id" : cellId}}}}}
    ]},     {$set:{"songs.$[s].song_status.$[i].status":update}},
   { arrayFilters: [ { "s._id" : song } , { "i.instrument": instrument }], multi: true}
   )

}

async function _delete(id) {
    await Projects.findByIdAndRemove(id);
}