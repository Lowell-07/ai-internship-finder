import express from "express";
import {
  sendMessage,
  getSessions,
  getSession,
} from "../services/chat.service.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  res.json(await sendMessage(req.body.session_id, req.body.message));
});

router.get("/chat/sessions", async (_req, res) => {
  res.json(await getSessions());
});

router.get("/chat/sessions/:sessionId", async (req, res) => {
  const session = await getSession(req.params.sessionId);
  if (!session) {
    res.status(404).json({ error: "Session not found" });
    return;
  }

  res.json(session);
});

export default router;
