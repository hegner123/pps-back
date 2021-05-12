const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require('multer');
const cors = require('cors');
const errorHandler = require('./_helpers/error-handler');
require('dotenv').config()
const keys = require('./keys')
const users = require("./routes/api/users");
const router = require("express").Router();
const app = express();
mongoose.set('useFindAndModify', false);
app.use(express.static('public'))
app.use(cors());

const routes = require("./routes");


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// // If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// Multer Upload
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'public/images/uploads') //this is where the file's going to be placed
},
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
}
});
const upload = multer({ storage })

// Upload Route for files
app.post('/upload', upload.single('image'), (req, res) => {
	if (req.file)
		res.json({
			imageUrl: `images/uploads/${req.file.filename}`
	});
	else
		res.status("409").json("No Files to Upload.");
});

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());



// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use("/api/", users);
app.use(routes);
// global error handler
app.use(errorHandler);
// // ... other app.use middleware
// app.use(express.static(path.join(__dirname, "client", "build")));

// // ...
// // Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
const port =   process.env.PORT || 4000;


app.listen(port, () => console.log(`Server up and running on port ${port} !`));
