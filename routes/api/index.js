const router = require("express").Router();

const userRoutes = require("./users");
const spotify = require("./spotify")

// Project routes

router.use("/song-preview", spotify)
router.use("/users", userRoutes);

module.exports = router;