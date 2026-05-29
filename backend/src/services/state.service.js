const { createId } = require("../utils/id");

const now = () => new Date().toISOString();

const seedInternships = [
  {
    id: "internship-1",
    title: "AI Research Intern",
    company: "OpenAI",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/12220/12220289.png",
    location: "Remote",
    workMode: "remote",
    duration: "6 Months",
    salary: "$8,000/mo",
    description: "Work on evaluation, tooling, and model iteration for language systems.",
    requirements: ["Python", "PyTorch", "Research"],
    skills: ["Python", "PyTorch", "Transformers"],
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    applicantsCount: 18,
    source: "Company Page",
    url: "#",
    relevanceScore: 0.96,
    explanation: "Strong match for ML-focused resumes.",
    saved: false,
  },
  {
    id: "internship-2",
    title: "Frontend Engineering Intern",
    company: "Vercel",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
    location: "San Francisco, US",
    workMode: "hybrid",
    duration: "16 Weeks",
    salary: "$7,500/mo",
    description: "Build developer-facing UI and platform features with Next.js.",
    requirements: ["Next.js", "TypeScript", "React"],
    skills: ["Next.js", "TypeScript", "React", "Tailwind"],
    postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    applicantsCount: 24,
    source: "LinkedIn",
    url: "#",
    relevanceScore: 0.9,
    explanation: "High fit for frontend-heavy resumes.",
    saved: false,
  },
  {
    id: "internship-3",
    title: "Product Design Intern",
    company: "Airbnb",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111320.png",
    location: "Remote",
    workMode: "remote",
    duration: "12 Weeks",
    salary: "$3,000/mo",
    description: "Contribute to design systems and booking flows.",
    requirements: ["Figma", "Design Systems", "Research"],
    skills: ["Figma", "Research", "Design Systems"],
    postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    applicantsCount: 11,
    source: "Wellfound",
    url: "#",
    relevanceScore: 0.88,
    explanation: "Strong fit for design resumes.",
    saved: false,
  },
  {
    id: "internship-4",
    title: "MLOps Intern",
    company: "Databricks",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    location: "San Francisco, US",
    workMode: "hybrid",
    duration: "12 Weeks",
    salary: "$6,500/mo",
    description: "Ship model pipelines, feature stores, and deployment automation.",
    requirements: ["Python", "Kubernetes", "MLflow"],
    skills: ["Python", "Kubernetes", "Airflow", "MLflow"],
    postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    applicantsCount: 9,
    source: "Company Page",
    url: "#",
    relevanceScore: 0.84,
    explanation: "Pipeline and infra alignment.",
    saved: false,
  },
  {
    id: "internship-5",
    title: "Data Science Intern",
    company: "Netflix",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
    location: "Los Gatos, US",
    workMode: "hybrid",
    duration: "12 Weeks",
    salary: "$6,800/mo",
    description: "Analyze experimentation and recommendation signals.",
    requirements: ["Python", "SQL", "Statistics"],
    skills: ["Python", "SQL", "Pandas", "Statistics"],
    postedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    applicantsCount: 16,
    source: "LinkedIn",
    url: "#",
    relevanceScore: 0.8,
    explanation: "Good fit for analytics-oriented candidates.",
    saved: false,
  },
];

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
          content: "Top remote AI matches are OpenAI, Hugging Face, and Databricks from the current mock catalog.",
          timestamp: now(),
          confidence: 0.84,
        },
      ],
      createdAt: now(),
    },
  ],
  internships: seedInternships,
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
      jobsProcessed: seedInternships.length,
      errorCount: 0,
      logs: [],
    },
  ],
};

function getState() {
  return state;
}

function getSeedInternships() {
  return [...seedInternships];
}

function createResume(filename) {
  const domain = filename.toLowerCase().includes("design")
    ? ["Product Design"]
    : filename.toLowerCase().includes("data")
    ? ["Data Science"]
    : ["Frontend Engineering"];

  const parsedData = {
    skills: domain[0] === "Product Design" ? ["Figma", "User Research", "React"] : ["React", "TypeScript", "Python"],
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

module.exports = {
  getState,
  getSeedInternships,
  createResume,
};
