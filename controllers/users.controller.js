import express from "express";
const router = express.Router();
import { userService } from "../_helpers/user.service.js";

// routes
router.post("/authenticate", authenticate);
router.get("/:id", getUser);
router.post("/register", register);
router.put("/:id", update);
router.put("/addtorecent/:id", add);
router.delete("/:id", _delete);
router.get("/confirm/:confirmationCode", confirm);

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
export { router as userRouter };
