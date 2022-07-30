import { config } from "../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./db.js";

export const userService = {
  authenticate,
  getById,
  create,
  update,
  addToRecent,
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
    username: userParam.username,
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
  console.log("projectId", projectId);
  console.log("userId", userId);
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
