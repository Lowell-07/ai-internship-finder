const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const corsOptions = require("./configs/cors");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

module.exports = app;
