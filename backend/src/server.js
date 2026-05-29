// backend/src/server.js
import { syncDatabase } from "./models/index.js";
import jobsRoutes from "./routes/jobs.routes.js";
import app from "./app.js"; // ← was: require("./app")
import env from "./configs/env.js"; // ← was: require("./configs/env")
import { startScheduler } from "./agents/scheduler.agent.js"; // ← was: require()
import { refreshLinkedInAgent } from "./services/agent.service.js"; // ← was: require()
import { log } from "./utils/logger.js"; // ← was: require()

// Mount routes BEFORE starting server
app.use("/api/jobs", jobsRoutes);

await syncDatabase(); // ← moved inside bootstrap for proper sequencing
await refreshLinkedInAgent();
startScheduler();

app.listen(env.port, () => {
  log("info", "server.started", { port: env.port });
});
