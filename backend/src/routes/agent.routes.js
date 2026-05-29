const express = require("express");
const { getAgentStatus, triggerAgentRun } = require("../services/agent.service");

const router = express.Router();

router.get("/agents/status", (_req, res) => {
  res.json(getAgentStatus());
});

router.post("/agents/:agentId/run", async (req, res) => {
  await triggerAgentRun(req.params.agentId);
  res.status(204).send();
});

module.exports = router;
