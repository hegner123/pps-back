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
    // console.log(Projects.findById(id))
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

async function updateCell({user, project, song, instrument}) {
    return await Projects.find({"songs.song_title": [song]})
    // const Projects = await Projects.findById(user);
    // let CurrentProjects = Object.keys(Projects[song])
   
    // // copy ProjectsParam properties to Projects
    // Object.assign(Projects[song.key].song, instrument);

    // await Projects.save();
}

async function _delete(id) {
    await Projects.findByIdAndRemove(id);
}