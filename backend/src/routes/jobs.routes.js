import express from "express";
import { Internship } from "../models/internship.model.js";
import { ingestRemoteOKJobs } from "../services/jobIngestion.service.js";

const router = express.Router();

router.get("/sync", async (req, res) => {
  await ingestRemoteOKJobs();

  res.json({
    success: true,
    message: "Jobs synced",
  });
});

router.get("/", async (req, res) => {
  const jobs = await Internship.findAll({
    limit: 50,
    order: [["createdAt", "DESC"]],
  });

  res.json(jobs);
});

export default router;
