import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { corsOptions } from "./configs/cors.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export default app;
