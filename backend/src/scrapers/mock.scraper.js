const { getSeedInternships } = require("../services/state.service");

async function collectInternships() {
  const internships = getSeedInternships();

  return internships.map((item, index) => ({
    ...item,
    applicantsCount: Math.max(1, item.applicantsCount - (index % 3)),
  }));
}

module.exports = { collectInternships };
