const express = require("express");
const { sendMessage, getSessions, getSession } = require("../services/chat.service");

const router = express.Router();

router.post("/chat", (req, res) => {
  res.json(sendMessage(req.body.session_id, req.body.message));
});

router.get("/chat/sessions", (_req, res) => {
  res.json(getSessions());
});

router.get("/chat/sessions/:sessionId", (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) {
    res.status(404).json({ error: "Session not found" });
    return;
  }

  res.json(session);
});

module.exports = router;
