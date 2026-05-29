import express from "express";
import {
  getInternships,
  getRecommendedInternships,
  toggleSaveInternship,
} from "../services/internship.service.js";

const router = express.Router();

router.get("/internships", async (req, res) => {
  res.json(await getInternships(req.query, req.query.search || ""));
});

router.post("/internships/recommended", async (req, res) => {
  const {
    resumeSkills,
    resumeTechnologies,
    resumeDomains,
    dislikedTopics,
    filters,
    searchQuery,
  } = req.body || {};
  res.json(
    await getRecommendedInternships(
      resumeSkills,
      resumeTechnologies,
      resumeDomains,
      dislikedTopics,
      filters,
      searchQuery,
    ),
  );
});

router.post("/internships/:id/save", async (req, res) => {
  await toggleSaveInternship(req.params.id);
  res.status(204).send();
});

export default router;
