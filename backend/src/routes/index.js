const express = require("express");
const healthRoutes = require("./health.routes");
const resumeRoutes = require("./resume.routes");
const internshipRoutes = require("./internship.routes");
const chatRoutes = require("./chat.routes");
const preferencesRoutes = require("./preferences.routes");
const agentRoutes = require("./agent.routes");

const router = express.Router();

router.use("/api", healthRoutes);
router.use("/api", resumeRoutes);
router.use("/api", internshipRoutes);
router.use("/api", chatRoutes);
router.use("/api", preferencesRoutes);
router.use("/api", agentRoutes);

module.exports = router;
