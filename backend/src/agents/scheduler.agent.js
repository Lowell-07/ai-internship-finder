import cron from "node-cron";
import env from "../configs/env.js";
import { refreshLinkedInAgent } from "../services/agent.service.js";
import { log } from "../utils/logger.js";

export function startScheduler() {
  cron.schedule(env.agentSchedule, async () => {
    log("info", "agent.scheduler.tick");
    await refreshLinkedInAgent();
  });
}
