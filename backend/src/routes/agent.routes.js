import express from "express";
import { getAgentStatus, triggerAgentRun } from "../services/agent.service.js";

const router = express.Router();

router.get("/agent/status", (req, res) => {
  res.json(getAgentStatus());
});

router.post("/agent/run", async (req, res) => {
  const result = await triggerAgentRun();
  res.json(result);
});

export default router;
