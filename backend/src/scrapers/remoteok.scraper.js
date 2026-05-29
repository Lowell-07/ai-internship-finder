import axios from "axios";

export async function fetchRemoteOKJobs() {
  try {
    const response = await axios.get("https://remoteok.com/api", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const jobs = response.data
      .filter((job) => job.position)
      .slice(0, 20)
      .map((job) => ({
        title: job.position,
        company: job.company,
        location: job.location || "Remote",
        url: job.url,
        description: job.description || "",
        source: "RemoteOK",
      }));

    return jobs;
  } catch (error) {
    console.error("RemoteOK Scraper Error:", error.message);
    return [];
  }
}
