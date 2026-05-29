const { createResume, getState } = require("./state.service");

function uploadResume(file) {
  const filename = file?.originalname || "resume.pdf";
  const resume = createResume(filename);

  return {
    resume_id: resume.id,
    parsed_data: resume.parsedData,
    message: "Resume parsed successfully.",
  };
}

function listResumes() {
  return {
    resumes: getState().resumes,
  };
}

function setActiveResume(resumeId) {
  getState().activeResumeId = resumeId;
}

module.exports = {
  uploadResume,
  listResumes,
  setActiveResume,
};
