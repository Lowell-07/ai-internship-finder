import { getState } from "./state.service.js";
import { fetchRemoteOKJobs } from "../scrapers/remoteok.scraper.js";
import { log } from "../utils/logger.js";
import { Internship } from "../models/internship.model.js";

export async function refreshLinkedInAgent() {
  const state = getState();
  const agent = state.agents.find((item) => item.id === "linkedin-scraper");
  if (!agent) return;

  agent.status = "running";
  agent.lastRun = new Date().toISOString();
  agent.logs.unshift({
    timestamp: agent.lastRun,
    level: "info",
    message: "Started scheduled refresh using mock scraper.",
  });

  const jobs = await fetchRemoteOKJobs();

  let newJobsCount = 0;
  for (const job of jobs) {
    const [internship, created] = await Internship.findOrCreate({
      where: { url: job.url },
      defaults: {
        ...job,
        postedAt: job.postedAt ? new Date(job.postedAt) : new Date(),
        relevanceScore: 0.5,
        applicantsCount: Math.floor(Math.random() * 50),
        saved: false,
      },
    });
    if (created) newJobsCount++;
  }

  agent.jobsFetched = jobs.length;
  agent.jobsProcessed = newJobsCount;
  agent.status = "scheduled";
  agent.nextRun = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  agent.logs.unshift({
    timestamp: new Date().toISOString(),
    level: "info",
    message: `Refresh completed with ${jobs.length} internships.`,
  });

  log("info", "agent.refresh.completed", { jobs: jobs.length });
}

export function getAgentStatus() {
  return { agents: getState().agents };
}

export async function triggerAgentRun(agentId) {
  const agent = getState().agents.find((item) => item.id === agentId);
  if (!agent) return;

  agent.status = "running";
  agent.lastRun = new Date().toISOString();
  agent.logs.unshift({
    timestamp: agent.lastRun,
    level: "info",
    message: "Manual trigger received.",
  });

  if (agentId === "linkedin-scraper") {
    await refreshLinkedInAgent();
    return;
  }

  agent.status = "idle";
}
