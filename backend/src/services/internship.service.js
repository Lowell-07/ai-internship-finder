const { getState } = require("./state.service");

function filterInternships(filters = {}, search = "") {
  const { internships, preferences } = getState();
  const query = search.toLowerCase();

  return internships.filter((item) => {
    if (filters.workMode) {
      const workModes = Array.isArray(filters.workMode) ? filters.workMode : [filters.workMode];
      if (workModes.length > 0 && !workModes.includes(item.workMode)) return false;
    }

    if (filters.maxApplicants && item.applicantsCount > Number(filters.maxApplicants)) {
      return false;
    }

    if (query) {
      const haystack = `${item.title} ${item.company} ${item.skills.join(" ")}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    const isExcluded = preferences.excludedTopics.some((topic) =>
      `${item.title} ${item.company}`.toLowerCase().includes(topic.toLowerCase())
    );

    return !isExcluded;
  });
}

function getInternships(filters, search) {
  const internships = filterInternships(filters, search);

  return { internships, total: internships.length };
}

function getRecommendedInternships() {
  const internships = [...getState().internships]
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3);

  return { internships };
}

function toggleSaveInternship(id) {
  const internship = getState().internships.find((item) => item.id === id);
  if (internship) internship.saved = !internship.saved;
}

function rateInternship(id, rating) {
  const preferences = getState().preferences;

  if (rating === "like" && !preferences.likedInternships.includes(id)) {
    preferences.likedInternships.push(id);
  }

  if (rating === "dislike" && !preferences.dislikedInternships.includes(id)) {
    preferences.dislikedInternships.push(id);
  }
}

module.exports = {
  getInternships,
  getRecommendedInternships,
  toggleSaveInternship,
  rateInternship,
};
