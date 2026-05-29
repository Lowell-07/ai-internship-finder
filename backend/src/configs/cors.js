import env from "./env.js";

export const corsOptions = {
  origin: env.corsOrigin.split(",").map((value) => value.trim()),
  credentials: true,
};
