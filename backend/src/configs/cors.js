const env = require("./env");

const corsOptions = {
  origin: env.corsOrigin.split(",").map((value) => value.trim()),
  credentials: true,
};

module.exports = corsOptions;
