const config = require('config.json');
const db = require('_helpers/db');
const Projects = db.Projects;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
 


async function getAll() {
    return await Projects.find();
}

async function getById(id) {
    console.log(id)
    return await Projects.findById(id);
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

async function update(id, ProjectsParam) {
    const Projects = await Projects.findById(id);

    // validate
    if (!Projects) throw 'Projects not found';
    if (Projects.ProjectsName !== ProjectsParam.ProjectsName && await Projects.findOne({ ProjectsName: ProjectsParam.ProjectsName })) {
        throw 'ProjectsName "' + ProjectsParam.ProjectsName + '" is already taken';
    }
    // copy ProjectsParam properties to Projects
    Object.assign(Projects, ProjectsParam);

    await Projects.save();
}

async function _delete(id) {
    await Projects.findByIdAndRemove(id);
}