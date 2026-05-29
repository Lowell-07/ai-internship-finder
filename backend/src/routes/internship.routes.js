const express = require("express");
const {
  getInternships,
  getRecommendedInternships,
  toggleSaveInternship,
  rateInternship,
} = require("../services/internship.service");

const router = express.Router();

router.get("/internships", (req, res) => {
  res.json(getInternships(req.query, req.query.search || ""));
});

router.get("/internships/recommended", (_req, res) => {
  res.json(getRecommendedInternships());
});

router.post("/internships/:id/save", (req, res) => {
  toggleSaveInternship(req.params.id);
  res.status(204).send();
});

router.post("/internships/:id/rate", (req, res) => {
  rateInternship(req.params.id, req.body.rating);
  res.status(204).send();
});

module.exports = router;
