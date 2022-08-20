import { config } from "../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./db.js";
import { statusConstants as status } from "./status.constants.js";
import { projectService } from "./project.service.js";
import { sendInviteEmail } from "./node.mailer.js";

export const userService = {
  authenticate,
  getById,
  create,
  resetPassword,
  update,
  addToRecent,
  matchUsers,
  saveSettings,
  sendInvitation,
  sendExternalInvite,
  handleInvitation,
  checkInvites,
  delete: _delete,
};

async function authenticate({ userName, hash }) {
  const user = await User.findOne({ userName });
  if (user && bcrypt.compareSync(hash, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });
    return { ...user.toJSON(), token };
  }
}

async function getById(id) {
  const user = await User.findOne(id);
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });
    if (user) {
      return { ...user.toJSON(), token };
    }
  }
}

async function matchUsers(email) {
  // const searchExpression = new RegExp(`^.*(${email}).*`);
  // const emailRegEx =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const searchResult = await User.findOne({ email: email });
  if (searchResult) {
    return { ...searchResult.toJSON() };
  } else {
    return `Invite ${email} to Proproject Studio?`;
  }
}

async function create(userParam) {
  // validate
  if (await User.findOne({ userName: userParam.userName })) {
    throw 'UserName "' + userParam.userName + '" is already taken';
  }
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  const token = jwt.sign({ email: userParam.email });

  const user = new User({
    userName: userParam.userName,
    email: userParam.email,
    firstName: userParam.firstName,
    lastName: userParam.lastName,
    password: bcrypt.hashSync(userParam.password, 8),
    confirmationCode: token,
  });

  // save user
  await user.save();
  mail.sendMail(userParam.firstName, userParam.email, token);
}

async function resetPassword(userParam) {
  const user = await User.findById(userParam.id);

  // validate
  if (!user) throw "User not found";
  if (
    user.userName !== userParam.userName &&
    (await User.findOne({ userName: userParam.userName }))
  ) {
    throw 'UserName "' + userParam.userName + '" is already taken';
  }

  // hash hash if it was entered
  if (userParam.hash) {
    userParam.hash = bcrypt.hashSync(userParam.hash, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);
  // console.log(user);
  await user.save();
  return { ...user.toJSON() };
}

async function confirmAccount() {
  User.findOne({});
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.userName !== userParam.userName &&
    (await User.findOne({ userName: userParam.userName }))
  ) {
    throw 'UserName "' + userParam.userName + '" is already taken';
  }

  // hash hash if it was entered
  if (userParam.hash) {
    userParam.hash = bcrypt.hashSync(userParam.hash, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function addToRecent(userId, projectId) {
  const user = await User.updateOne(
    { _id: userId },
    {
      $push: {
        recentProjects: {
          $each: [{ recentID: projectId }],
          $slice: 3,
          $sort: -1,
        },
      },
    }
  );

  return user;
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

async function saveSettings(id, userParam) {
  const user = await User.findById(id);

  if (!user) throw "User not found";

  const updated = {
    ...user,
    userSettings: userParam,
  };

  // copy userParam properties to user
  Object.assign(user, updated);

  await user.save();
  return { ...user.toJSON() };
}

async function sendInvitation(sendToId, userParam) {
  const user = await User.findOneAndUpdate(
    { _id: sendToId },
    {
      $push: {
        invitations: {
          projectSlug: userParam.projectSlug,
          projectId: userParam.projectId,
          invitationStatus: status.PENDING,
          hostUser: {
            userName: userParam.hostUser.userName,
            id: userParam.hostUser.userId,
          },
        },
      },
    }
  ).then((dbModel) => {
    return dbModel;
  });

  if (!user) throw "User not found";
}

async function sendExternalInvite(sendToId, userParam) {
  const options = {
    email: userParam.email,
    hostUser,
    projectName,
    inviteMessage,
    link: { url, text },
  };

  const sendEmail = await sendInviteEmail(options);

  return sendEmail;
}

async function handleInvitation(userId, userParam) {
  const user = await User.findById(userId);

  if (!user) throw "User not found";

  const theInvite = user.invitations.filter((invitation) => {
    return invitation._id == userParam.invitationId;
  });

  const otherInvites = user.invitations.filter((invitation) => {
    return invitation._id != userParam.invitationId;
  });

  function updateInvite(invitation) {
    invitation.invitationStatus = userParam.status;
    return invitation;
  }

  async function sideEffects(action, userId, userName, projectId) {
    switch (action) {
      case status.ACCEPTED:
        const args = {
          body: {
            id: userId,
            userName: userName,
          },
          params: { id: projectId },
        };

        return projectService.addUser(args);

      case status.DECLINED:
        break;

      default:
        break;
    }
  }

  // copy userParam properties to user
  const updated = {
    ...user,
    user: { invitations: [updateInvite(theInvite[0]), ...otherInvites] },
  };

  Object.assign(user, updated);

  const effects = await sideEffects(
    userParam.status,
    userId,
    user.userName,
    theInvite[0].projectId
  );

  await user.save();
  return {
    ...user.toJSON(),
    sideEffects: effects,
  };
  // return { updated };
}

async function checkInvites(sendToId, projectId) {
  const user = await User.findById(sendToId);
  const hasMatch = user.invitations.filter((invite) => {
    return invite.projectId == projectId;
  });
  if (hasMatch.length > 0) {
    return true;
  } else {
    return false;
  }
}
