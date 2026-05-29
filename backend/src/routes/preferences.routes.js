const express = require("express");
const { getPreferences, updatePreferences } = require("../services/preferences.service");

const router = express.Router();

router.get("/preferences", (_req, res) => {
  res.json(getPreferences());
});

router.patch("/preferences", (req, res) => {
  res.json(updatePreferences(req.body));
});

module.exports = router;
