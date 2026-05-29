const express = require("express");
const multer = require("multer");
const { listResumes, setActiveResume, uploadResume } = require("../services/resume.service");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/resumes", (_req, res) => {
  res.json(listResumes());
});

router.post("/resumes/upload", upload.single("file"), (req, res) => {
  res.json(uploadResume(req.file));
});

router.post("/resumes/active", (req, res) => {
  setActiveResume(req.body.resume_id);
  res.status(204).send();
});

module.exports = router;
