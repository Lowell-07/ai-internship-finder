import { Internship } from "../models/internship.model.js";
import { getState } from "./state.service.js";

function filterInternships(internships, filters = {}, search = "") {
  const { preferences } = getState();
  const query = search.toLowerCase();

  return internships.filter((item) => {
    if (filters.workMode) {
      const workModes = Array.isArray(filters.workMode)
        ? filters.workMode
        : [filters.workMode];
      if (workModes.length > 0 && !workModes.includes(item.workMode))
        return false;
    }

    if (
      filters.maxApplicants &&
      item.applicantsCount > Number(filters.maxApplicants)
    ) {
      return false;
    }

    if (query) {
      const skills = Array.isArray(item.skills) ? item.skills : [];
      const haystack =
        `${item.title} ${item.company} ${skills.join(" ")}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    const isExcluded = preferences.excludedTopics.some((topic) =>
      `${item.title} ${item.company}`
        .toLowerCase()
        .includes(topic.toLowerCase()),
    );

    return !isExcluded;
  });
}

async function getInternships(filters, search) {
  const internships = await Internship.findAll();
  const plainInternships = internships.map((item) => item.get({ plain: true }));
  const filtered = filterInternships(plainInternships, filters, search);

  return { internships: filtered, total: filtered.length };
}

function detectDomain(skills, technologies) {
  const all = [...skills, ...technologies].map((s) => s.toLowerCase());
  const scores = { design: 0, engineering: 0, ml: 0, data: 0 };

  const designKeywords = [
    "figma",
    "sketch",
    "adobe",
    "design",
    "ui",
    "ux",
    "prototype",
    "visual",
    "brand",
    "illustrator",
    "photoshop",
  ];
  const engKeywords = [
    "react",
    "next.js",
    "javascript",
    "typescript",
    "node",
    "frontend",
    "backend",
    "full stack",
    "go",
    "rust",
    "swift",
    "kotlin",
    "mobile",
    "devops",
    "kubernetes",
  ];
  const mlKeywords = [
    "python",
    "pytorch",
    "tensorflow",
    "machine learning",
    "ml",
    "nlp",
    "transformers",
    "deep learning",
    "computer vision",
    "reinforcement learning",
    "jax",
  ];
  const dataKeywords = [
    "sql",
    "pandas",
    "data",
    "analytics",
    "statistics",
    "etl",
    "spark",
    "airflow",
  ];

  all.forEach((term) => {
    if (designKeywords.some((k) => term.includes(k))) scores.design++;
    if (engKeywords.some((k) => term.includes(k))) scores.engineering++;
    if (mlKeywords.some((k) => term.includes(k))) scores.ml++;
    if (dataKeywords.some((k) => term.includes(k))) scores.data++;
  });

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return winner[1] > 0 ? winner[0] : "engineering";
}

function scoreInternship(
  internship,
  resumeSkills,
  resumeTechnologies,
  dislikedTopics,
) {
  const userTerms = [...resumeSkills, ...resumeTechnologies].map((s) =>
    s.toLowerCase(),
  );
  const internshipSkills = Array.isArray(internship.skills)
    ? internship.skills
    : [];
  const internshipReqs = Array.isArray(internship.requirements)
    ? internship.requirements
    : [];
  const internTerms = [...internshipSkills, ...internshipReqs].map((s) =>
    s.toLowerCase(),
  );

  const matches = internTerms.filter((t) =>
    userTerms.some((u) => t.includes(u) || u.includes(t)),
  );
  const matchRatio = matches.length / Math.max(internTerms.length, 1);

  let score = 0.5 + matchRatio * 0.45;

  const titleCompany =
    `${internship.title} ${internship.company}`.toLowerCase();
  const hasDisliked = dislikedTopics.some((topic) =>
    titleCompany.includes(topic.toLowerCase()),
  );
  if (hasDisliked) score *= 0.1;

  if (internship.saved) score += 0.05;
  score = Math.min(score, 0.99);

  let explanation = "";
  if (matches.length > 0) {
    explanation = `Matches your ${matches.slice(0, 3).join(", ")} skills`;
  } else if (internship.relevanceScore > 0.7) {
    explanation = "Recommended based on your profile domain";
  } else {
    explanation = "Trending opportunity in your field";
  }
  if (hasDisliked) explanation = "Filtered due to preference exclusion";

  return {
    ...internship,
    relevanceScore: Math.round(score * 100) / 100,
    explanation,
  };
}

async function getRecommendedInternships(
  resumeSkills = [],
  resumeTechnologies = [],
  resumeDomains = [],
  dislikedTopics = [],
  filters = {},
  searchQuery = "",
) {
  const domain = detectDomain(resumeSkills, resumeTechnologies);
  const internships = await Internship.findAll();
  let pool = internships.map((item) => item.get({ plain: true }));

  let scored = pool.map((i) =>
    scoreInternship(i, resumeSkills, resumeTechnologies, dislikedTopics),
  );

  if (filters.workMode && filters.workMode.length) {
    scored = scored.filter((i) => filters.workMode.includes(i.workMode));
  }
  if (filters.maxApplicants) {
    scored = scored.filter((i) => i.applicantsCount <= filters.maxApplicants);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    scored = scored.filter((i) => {
      const skills = Array.isArray(i.skills) ? i.skills : [];
      return (
        i.title.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q) ||
        skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }

  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const visible = scored.filter((i) => i.relevanceScore > 0.15);

  return {
    forYou: visible.slice(0, 6),
    trending: [...visible]
      .sort((a, b) => b.applicantsCount - a.applicantsCount)
      .slice(0, 4),
    recent: [...visible]
      .sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
      )
      .slice(0, 4),
  };
}

async function toggleSaveInternship(id) {
  const internship = await Internship.findByPk(id);
  if (internship) {
    await internship.update({ saved: !internship.saved });
  }
}

async function createInternship(data) {
  const internship = await Internship.create(data);
  return internship.get({ plain: true });
}

export {
  getInternships,
  getRecommendedInternships,
  toggleSaveInternship,
  createInternship,
};
