const router = require("express").Router();
const projectController = require("../../controllers/project.controller");



// Matches with "/" to creat projects
router.route("/")
  .get(projectController.findAll)
  .post(projectController.create)
// Matches with "/api/projects/userprojects"
router.route("/userprojects/:id")
  .get(projectController.findAll)
  .post(projectController.create)

// Matches with "/api/projects/:id"
router
  .route("/:id")
  .get(projectController.findById)
  .delete(projectController.remove)
  .put(projectController.update)
  
router
  .route("/userprojects/:id/songs")
  .post(projectController.pushSong)

  router
  .route("/song/arrangement/:id")
  .put(projectController.update)

router
  .route("/note/add/:id")
  .get(projectController.findById)
  .put(projectController.addNote)

router
  .route("/note/remove/:id")
  .get(projectController.findById)
  .put(projectController.removeNote)

module.exports = router;