const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const db = require("../../_helpers/db");
const User = db.User

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      return res.status(400).json({ userName: "UserName already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        hash: req.body.hash
      });
      console.log("newUser info: " + newUser)
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.hash, salt, (err, hash) => {
          if (err) throw err;
          newUser.hash = hash;
          console.log("password hashed")
          newUser
            .save()
            .then(user => {res.json(user);console.log("user added")})
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const hash = req.body.hash;

  // Find user by email
  User.findOne({ userName }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ userNameNotFound: "Email not found" });
    }

    // Check password
    bcrypt.compare(hash, user.hash).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstName: user.firstName,
          userName: user.userName
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
router.get('/', getAll);

function getAll(req, res, next) {
  getAllUsers()
      .then(users => res.json(users))
      .catch(err => next(err));
}
async function getAllUsers() {
  return await User.find();
}

module.exports = router;
