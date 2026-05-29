import express from "express";
import healthRoutes from "./health.routes.js";
import resumeRoutes from "./resume.routes.js";
import internshipRoutes from "./internship.routes.js";
import chatRoutes from "./chat.routes.js";
import preferencesRoutes from "./preferences.routes.js";
import agentRoutes from "./agent.routes.js";

const router = express.Router();

router.use("/api", healthRoutes);
router.use("/api", resumeRoutes);
router.use("/api", internshipRoutes);
router.use("/api", chatRoutes);
router.use("/api", preferencesRoutes);
router.use("/api", agentRoutes);

export default router;
