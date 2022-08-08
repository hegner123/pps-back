import express from "express";
const router = express.Router();
import { userService } from "../_helpers/user.service.js";

// routes
router.post("/authenticate", authenticate);
router.get("/:id", getUser);
router.post("/register", register);
router.put("/:id", update);
router.put("/:id/settings", saveSettings);
router.put("/recent/:id", add);
router.delete("/:id", _delete);
router.get("/confirm/:confirmationCode", confirm);
router.get("/search/:email", getUsers);
router.post("/invitation.send/:id", sendInvitation);
router.post("/invitation.handle/:id", handleInvitation);
router.post("/invitation.check/:id", checkInvites);

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function getUser(req, res, next) {
  console.log(req.params.id);
  userService
    .getById({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => next(err));
}

function getUsers(req, res, next) {
  userService
    .matchUsers(req.params.email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .then(() => {})
    .catch((err) => next(err));
}

function confirm(req, res, next) {
  userService
    .confirm(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function add(req, res, next) {
  userService
    .addToRecent(req.params.id, req.body._id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function saveSettings(req, res, next) {
  userService
    .saveSettings(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}
function sendInvitation(req, res, next) {
  userService
    .sendInvitation(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}
function handleInvitation(req, res, next) {
  userService
    .handleInvitation(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}
function checkInvites(req, res, next) {
  userService
    .checkInvites(req.params.id, req.body.projectId)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}
export { router as userRouter };
