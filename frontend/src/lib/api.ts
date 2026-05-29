"use client";

import axios from "axios";
import { AgentStatus, ChatMessage } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

async function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

const MOCK_AGENTS: AgentStatus[] = [
  {
    id: "linkedin-scraper",
    name: "LinkedIn Scraper",
    status: "scheduled",
    lastRun: new Date(Date.now() - 300000).toISOString(),
    nextRun: new Date(Date.now() + 1800000).toISOString(),
    jobsFetched: 24,
    jobsProcessed: 24,
    errorCount: 0,
    logs: [
      { timestamp: new Date(Date.now() - 300000).toISOString(), level: "info", message: "Completed mock refresh." },
      { timestamp: new Date(Date.now() - 280000).toISOString(), level: "info", message: "Stored refreshed internships in memory." },
    ],
  },
  {
    id: "ranking-agent",
    name: "Ranking Agent",
    status: "idle",
    lastRun: new Date(Date.now() - 600000).toISOString(),
    nextRun: null,
    jobsFetched: 0,
    jobsProcessed: 5,
    errorCount: 0,
    logs: [
      { timestamp: new Date(Date.now() - 600000).toISOString(), level: "info", message: "Scored current internship catalog." },
    ],
  },
];

export async function uploadResume(file: File): Promise<any> {
  return withFallback(
    (async () => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/api/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    })(),
    {
      resume_id: `resume-${Date.now()}`,
      parsed_data: {
        skills: ["React", "TypeScript", "Python"],
        projects: ["Portfolio website", "Internship tracker"],
        experience: [{ title: "Student", company: "University", duration: "2022-2026", description: "CS student" }],
        education: [{ degree: "B.S. Computer Science", institution: "State University", year: "2026" }],
        certifications: [],
        technologies: ["React", "Next.js", "Tailwind"],
        preferredDomains: ["Frontend Engineering"],
        summary: `Resume uploaded: ${file.name}`,
        embedding: [],
      },
      message: "Resume parsed successfully (offline mode)",
    }
  );
}

export async function toggleSaveInternship(id: string): Promise<void> {
  return withFallback(api.post(`/api/internships/${id}/save`).then(() => undefined), undefined);
}

export async function rateInternship(id: string, rating: "like" | "dislike"): Promise<void> {
  return withFallback(api.post(`/api/internships/${id}/rate`, { rating }).then(() => undefined), undefined);
}

export async function sendChatMessage(
  sessionId: string | null,
  message: string
): Promise<{ session_id: string; message: ChatMessage }> {
  return withFallback(
    api.post("/api/chat", { session_id: sessionId, message }).then((response) => response.data),
    {
      session_id: sessionId || `session-${Date.now()}`,
      message: {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: generateChatFallback(message),
        timestamp: new Date().toISOString(),
        confidence: 0.75,
      },
    }
  );
}

function generateChatFallback(query: string): string {
  const normalized = query.toLowerCase();

  if (normalized.includes("remote")) {
    return "Remote matches currently include the OpenAI, Airbnb, and Databricks listings from the local demo catalog.";
  }

  if (normalized.includes("claude") || normalized.includes("anthropic") || normalized.includes("exclude")) {
    return "Preference memory is still demo-only, but the UI will immediately hide items you dislike in the current session.";
  }

  if (normalized.includes("ml") || normalized.includes("machine learning") || normalized.includes("nlp")) {
    return "Top ML and NLP matches in the demo catalog are OpenAI, Databricks, and Netflix.";
  }

  if (normalized.includes("paid") || normalized.includes("salary") || normalized.includes("compensation")) {
    return "The strongest paid matches right now are OpenAI ($8k/mo), Vercel ($7.5k/mo), and Netflix ($6.8k/mo).";
  }

  return "The assistant is still deterministic today. It can answer basic search and preference questions, but it is not yet backed by a real RAG pipeline.";
}

export async function updatePreferences(prefs: Partial<any>): Promise<void> {
  return withFallback(api.patch("/api/preferences", prefs).then(() => undefined), undefined);
}

export async function getAgentStatus(): Promise<{ agents: AgentStatus[] }> {
  return withFallback(api.get("/api/agents/status").then((response) => response.data), { agents: MOCK_AGENTS });
}

export async function triggerAgentRun(agentId: string): Promise<void> {
  return withFallback(api.post(`/api/agents/${agentId}/run`).then(() => undefined), undefined);
}

export default api;
