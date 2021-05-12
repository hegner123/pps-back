const router = require("express").Router();
const projectRoutes = require("./projects");
const userRoutes = require("./users");
const spotify = require("./spotify")

// Project routes
router.use("/projects", projectRoutes);
router.use("/song-preview", spotify)
router.use("/users", userRoutes);

module.exports = router;