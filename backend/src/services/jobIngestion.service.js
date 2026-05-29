import { Internship } from "../models/internship.model.js";
import { fetchRemoteOKJobs } from "../scrapers/remoteok.scraper.js";

export async function ingestRemoteOKJobs() {
  const jobs = await fetchRemoteOKJobs();

  for (const job of jobs) {
    const existing = await Internship.findOne({
      where: {
        url: job.url,
      },
    });

    if (!existing) {
      await Internship.create(job);
    }
  }

  console.log(`✅ Saved ${jobs.length} jobs`);
}
