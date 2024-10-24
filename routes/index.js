const router = require("express").Router();

//! Auth Router
router.use("/api/v1/auth", require("./Auth.js"));

//! Courses Router
router.use("/api/v1/quiz", require("./Quiz.js"));

module.exports = router;
