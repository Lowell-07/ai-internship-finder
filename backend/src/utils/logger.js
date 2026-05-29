const env = require("../configs/env");

function log(level, message, meta) {
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

module.exports = { log };
