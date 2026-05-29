import { createId } from "../utils/id.js";

const now = () => new Date().toISOString();

const state = {
  resumes: [],
  activeResumeId: null,
  preferences: {
    likedInternships: [],
    dislikedInternships: [],
    excludedTopics: ["Claude"],
    preferredDomains: ["Machine Learning", "Frontend Engineering"],
    preferredLocations: ["Remote"],
    salaryExpectation: null,
    workMode: ["remote", "hybrid"],
    experienceLevel: "entry",
    maxApplicants: 50,
    requireResume: true,
    requireLinkedIn: false,
    requireGitHub: false,
  },
  chatSessions: [
    {
      id: "session-1",
      title: "Remote AI roles",
      messages: [
        {
          id: "message-1",
          role: "user",
          content: "Show me remote AI internships.",
          timestamp: now(),
        },
        {
          id: "message-2",
          role: "assistant",
          content:
            "Top remote AI matches are OpenAI, Hugging Face, and Databricks from the current mock catalog.",
          timestamp: now(),
          confidence: 0.84,
        },
      ],
      createdAt: now(),
    },
  ],
  agents: [
    {
      id: "linkedin-scraper",
      name: "LinkedIn Scraper",
      status: "scheduled",
      lastRun: null,
      nextRun: null,
      jobsFetched: 0,
      jobsProcessed: 0,
      errorCount: 0,
      logs: [],
    },
    {
      id: "ranking-agent",
      name: "Ranking Agent",
      status: "idle",
      lastRun: now(),
      nextRun: null,
      jobsFetched: 0,
      jobsProcessed: 0,
      errorCount: 0,
      logs: [],
    },
  ],
};

function getState() {
  return state;
}

function createStateSession(sessionId, title) {
  return {
    id: sessionId || createId("session"),
    title: title,
    messages: [],
    createdAt: now(),
  };
}

function getStateMessages(sessionId, all = false) {
  if (all) {
    return state.chatSessions;
  }
  return state.chatSessions.find((item) => item.id === sessionId) || null;
}

function addStateSession(session) {
  state.chatSessions.unshift(session);
}

function addStateMessage(sessionId, message) {
  const session = state.chatSessions.find((item) => item.id === sessionId);
  if (session) {
    session.messages.push(message);
  }
}

function createResume(filename) {
  const domain = filename.toLowerCase().includes("design")
    ? ["Product Design"]
    : filename.toLowerCase().includes("data")
      ? ["Data Science"]
      : ["Frontend Engineering"];

  const parsedData = {
    skills:
      domain[0] === "Product Design"
        ? ["Figma", "User Research", "React"]
        : ["React", "TypeScript", "Python"],
    projects: ["Portfolio Project", "Capstone"],
    experience: [],
    education: [],
    certifications: [],
    technologies: ["React", "Next.js", "Python"],
    preferredDomains: domain,
    summary: `Parsed profile for ${filename}`,
    embedding: [],
  };

  const resume = {
    id: createId("resume"),
    filename,
    fileUrl: "#",
    parsedData,
    uploadedAt: now(),
    modifiedAt: now(),
  };

  state.resumes = [resume, ...state.resumes];
  state.activeResumeId = resume.id;

  return resume;
}

export {
  getState,
  createStateSession,
  getStateMessages,
  addStateSession,
  addStateMessage,
  createResume,
};
