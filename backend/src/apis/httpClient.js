const axios = require("axios");

const httpClient = axios.create({
  timeout: 5000,
  headers: {
    "User-Agent": "AI-Internship-Finder/1.0",
  },
});

module.exports = httpClient;
