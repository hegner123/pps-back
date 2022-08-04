import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/user.models.js";

const userId = ["60f17f1576fc292fbc8f42e3", "61dc403791ad61df2652bb1d"];
const userName = ["testUser", "demo"];
const email = ["email@email.com", "demo@proprojectstudio.com"];
const avatar = [null, null];
const status = ["Active", "Active"];
const confirmationCode = ["proprojectstudio", "demo"];
const hash = [
  bcrypt.hashSync("root#root", 8),
  bcrypt.hashSync("demoproprojectstudio", 8),
];
const firstName = ["user", "demo"];
const lastName = ["userLast", "demo"];
const userSettings = {
  completeColor: "#00ff00",
  incompleteColor: "#ff0000",
  themeName: "default",
};

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(
  process.env.MONGOprojects_URI || "mongodb://localhost/pps-backend",
  connectionOptions
);
mongoose.Promise = global.Promise;

const userSeed = [
  {
    _id: userId[0],
    userName: userName[0],
    email: email[0],
    avatar: avatar[0],
    status: status[0],
    confirmationCode: confirmationCode[0],
    hash: hash[0],
    firstName: firstName[0],
    lastName: lastName[0],

    recentProjects: [],
    userSettings: userSettings,
  },
  {
    _id: userId[1],
    userName: userName[1],
    email: email[1],
    avatar: avatar[1],
    status: status[1],
    confirmationCode: confirmationCode[1],
    hash: hash[1],
    firstName: firstName[1],
    lastName: lastName[1],

    recentProjects: [],
    userSettings: userSettings,
  },
];
User.deleteMany({})
  .then((res) => {
    console.log(res);
    User.insertMany(userSeed).then((data) => {
      console.log(data + " records inserted!");
      process.exit(0);
    });
  })

  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// .remove({})
