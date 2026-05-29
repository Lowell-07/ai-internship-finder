import { syncDatabase } from "./models/index.js";

const app = require("./app");
const env = require("./configs/env");
const { startScheduler } = require("./agents/scheduler.agent");
const { refreshLinkedInAgent } = require("./services/agent.service");
const { log } = require("./utils/logger");

async function bootstrap() {
  await refreshLinkedInAgent();
  startScheduler();

  app.listen(env.port, () => {
    log("info", "server.started", { port: env.port });
  });
}

await syncDatabase();
bootstrap();
