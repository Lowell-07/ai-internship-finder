import express from "express";
import multer from "multer";
import {
  listResumes,
  setActiveResume,
  uploadResume,
} from "../services/resume.service.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/resumes", (_req, res) => {
  res.json(listResumes());
});

router.post("/resumes/upload", upload.single("file"), async (req, res) => {
  res.json(await uploadResume(req.file));
});

router.post("/resumes/active", (req, res) => {
  setActiveResume(req.body.resume_id);
  res.status(204).send();
});

export default router;
