import express from "express";
import {
  getPreferences,
  updatePreferences,
} from "../services/preferences.service.js";

const router = express.Router();

router.get("/preferences", (_req, res) => {
  res.json(getPreferences());
});

router.patch("/preferences", (req, res) => {
  res.json(updatePreferences(req.body));
});

export default router;
