import { config } from "../config.js";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { Projects } from "../models/project.models.js";

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(
    process.env.MONGODB_URI || config.connectionString,
    connectionOptions
  )
  .then(console.log(`\nDatabase connected! 🍀`.brightBlue))
  .catch((err) =>
    console.log(`\n Database Connection Error! 🔺\n\n${err}`.brightRed)
  );

mongoose.Promise = global.Promise;

export { User, Projects };
