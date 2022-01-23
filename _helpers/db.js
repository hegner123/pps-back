const config = require("../config.json");
const colors = require("colors");
const mongoose = require("mongoose");
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
  .then(console.log(colors.brightBlue(`\nDatabase connected! 🍀`)))
  .catch((err) =>
    console.log(colors.brightRed(`\n Database Connection Error! 🔺\n\n${err}`))
  );
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/user.models"),
  Project: require("../models/project.models"),
};
