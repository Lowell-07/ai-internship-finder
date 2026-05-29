import { createResume, getState } from "./state.service.js";
import pdfParse from "pdf-parse";

function extractKeywords(text) {
  const keywords = [];
  const knownSkills = [
    "react",
    "next.js",
    "javascript",
    "typescript",
    "node",
    "python",
    "sql",
    "figma",
    "aws",
    "docker",
  ];

  const lowerText = text.toLowerCase();
  for (const skill of knownSkills) {
    if (lowerText.includes(skill)) {
      keywords.push(skill);
    }
  }

  return {
    skills: keywords.slice(0, 5),
    technologies: keywords.slice(5),
    domains: lowerText.includes("design")
      ? ["Design"]
      : lowerText.includes("data")
        ? ["Data"]
        : ["Engineering"],
    education: lowerText.includes("university")
      ? "University Degree"
      : "Not Specified",
  };
}

export async function uploadResume(file) {
  const filename = file?.originalname || "resume.pdf";

  let parsedText = "";
  let extracted = { skills: [], technologies: [], domains: [], education: "" };

  try {
    if (file && file.buffer) {
      const data = await pdfParse(file.buffer);
      parsedText = data.text;
      extracted = extractKeywords(parsedText);
    }
  } catch (err) {
    console.error("PDF parse failed:", err);
  }

  const resume = createResume(filename);
  resume.parsedData = extracted;

  return {
    resume_id: resume.id,
    parsed_data: resume.parsedData,
    message: "Resume parsed successfully.",
  };
}

export function listResumes() {
  return {
    resumes: getState().resumes,
  };
}

export function setActiveResume(resumeId) {
  getState().activeResumeId = resumeId;
}
