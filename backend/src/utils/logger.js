import env from "../configs/env.js";

export function log(level, message, meta) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ? { meta } : {}),
  };

  if (env.nodeEnv !== "test") {
    console.log(JSON.stringify(entry));
  }
}
