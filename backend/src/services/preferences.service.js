const { getState } = require("./state.service");

function getPreferences() {
  return { preferences: getState().preferences };
}

function updatePreferences(payload) {
  const current = getState().preferences;

  current.workMode = payload.work_mode || current.workMode;
  current.experienceLevel = payload.experience_level || current.experienceLevel;
  current.maxApplicants = payload.max_applicants ?? current.maxApplicants;
  current.requireResume = payload.require_resume ?? current.requireResume;
  current.requireLinkedIn = payload.require_linkedin ?? current.requireLinkedIn;
  current.requireGitHub = payload.require_github ?? current.requireGitHub;
  current.excludedTopics = payload.excluded_topics || current.excludedTopics;

  return { preferences: current };
}

module.exports = {
  getPreferences,
  updatePreferences,
};
