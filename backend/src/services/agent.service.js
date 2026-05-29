const { getState } = require("./state.service");
const { collectInternships } = require("../scrapers/mock.scraper");
const { log } = require("../utils/logger");

async function refreshLinkedInAgent() {
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

  const jobs = await collectInternships();
  state.internships = jobs;

  agent.jobsFetched = jobs.length;
  agent.jobsProcessed = jobs.length;
  agent.status = "scheduled";
  agent.nextRun = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  agent.logs.unshift({
    timestamp: new Date().toISOString(),
    level: "info",
    message: `Refresh completed with ${jobs.length} internships.`,
  });

  log("info", "agent.refresh.completed", { jobs: jobs.length });
}

function getAgentStatus() {
  return { agents: getState().agents };
}

async function triggerAgentRun(agentId) {
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

module.exports = {
  getAgentStatus,
  triggerAgentRun,
  refreshLinkedInAgent,
};
