export interface UserProfile {
  id: string;
  name: string;
  email: string;
  resumes: Resume[];
  activeResumeId: string | null;
  preferences: UserPreferences;
  createdAt: string;
}

export interface Resume {
  id: string;
  filename: string;
  fileUrl: string;
  parsedData: ParsedResume | null;
  uploadedAt: string;
  modifiedAt: string;
}

export interface ParsedResume {
  skills: string[];
  projects: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: string[];
  technologies: string[];
  preferredDomains: string[];
  summary: string;
  embedding: number[];
}

export interface ExperienceEntry {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export interface UserPreferences {
  likedInternships: string[];
  dislikedInternships: string[];
  excludedTopics: string[];
  preferredDomains: string[];
  preferredLocations: string[];
  salaryExpectation: number | null;
  workMode: WorkMode[];
  experienceLevel: ExperienceLevel;
  maxApplicants: number;
  requireResume: boolean;
  requireLinkedIn: boolean;
  requireGitHub: boolean;
}

export type WorkMode = "remote" | "hybrid" | "onsite";
export type ExperienceLevel = "entry" | "moderate" | "senior" | "lead";

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: WorkMode;
  duration: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: string;
  applicantsCount: number;
  source: string;
  url: string;
  relevanceScore: number;
  explanation: string;
  saved: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: RetrievalSource[];
  confidence?: number;
}

export interface RetrievalSource {
  internshipId: string;
  title: string;
  company: string;
  snippet: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  status: "idle" | "running" | "error" | "scheduled";
  lastRun: string | null;
  nextRun: string | null;
  jobsFetched: number;
  jobsProcessed: number;
  errorCount: number;
  logs: AgentLog[];
}

export interface AgentLog {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

export interface FilterState {
  maxApplicants: number;
  experienceLevel: ExperienceLevel;
  workMode: WorkMode[];
  requireResume: boolean;
  requireLinkedIn: boolean;
  requireGitHub: boolean;
}
