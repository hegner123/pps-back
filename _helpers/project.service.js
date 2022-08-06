import { config } from "../config.js";
import { Projects } from "./db.js";
import { statusConstants as status } from "./status.constants.js";
export const projectService = { addUser };

async function addUser(req) {
  const newUser = {
    id: req.body.id,
    userName: req.body.userName,
  };

  const project = await Projects.findOne({ _id: req.params.id });

  const members = project.members.filter((member) => {
    return member.id == newUser.id;
  });

  if (members.length == 0) {
    const addedUser = await Projects.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { members: { id: newUser.id, userName: newUser.userName } } }
    );

    const res = await Projects.findOne({ _id: req.params.id });

    return { addUser: res.members[res.members.length - 1] };
  } else {
    return { addUser: "user already member of project" };
  }
}
