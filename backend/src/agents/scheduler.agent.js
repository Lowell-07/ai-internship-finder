const cron = require("node-cron");
const env = require("../configs/env");
const { refreshLinkedInAgent } = require("../services/agent.service");
const { log } = require("../utils/logger");

function startScheduler() {
  cron.schedule(env.agentSchedule, async () => {
    log("info", "agent.scheduler.tick");
    await refreshLinkedInAgent();
  });
}

module.exports = { startScheduler };
