"use client";

import { Internship, FilterState } from "@/types";

// ─── DYNAMIC MOCK DATABASE ───
// 20 internships across 4 domains

const DESIGN_INTERNSHIPS: Internship[] = [
  {
    id: "d1", title: "UX Design Intern", company: "Google",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    location: "London, UK", workMode: "hybrid", duration: "12 Weeks",
    salary: "£2,500/mo", description: "Join our UX team to work on consumer-facing products.",
    requirements: ["Figma", "User Research", "Prototyping"],
    skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
    postedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    applicantsCount: 8, source: "LinkedIn", url: "#",
    relevanceScore: 0.94, explanation: "Strong match: Figma + User Research skills", saved: false,
  },
  {
    id: "d2", title: "Product Design Intern", company: "Airbnb",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111320.png",
    location: "Remote", workMode: "remote", duration: "Insight",
    salary: "$3,000/mo", description: "Design systems and product experiences for global travel.",
    requirements: ["Design Systems", "React", "Figma"],
    skills: ["Design Systems", "React", "Figma", "Storybook"],
    postedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    applicantsCount: 15, source: "Wellfound", url: "#",
    relevanceScore: 0.91, explanation: "Design systems background aligns perfectly", saved: false,
  },
  {
    id: "d3", title: "Visual Design Intern", company: "Stripe",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968306.png",
    location: "Dublin, IE", workMode: "onsite", duration: "Competitive",
    salary: "€2,800/mo", description: "Create visual identities and marketing materials.",
    requirements: ["Illustrator", "Photoshop", "Brand Design"],
    skills: ["Illustrator", "Photoshop", "Brand Design", "After Effects"],
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    applicantsCount: 4, source: "Indeed", url: "#",
    relevanceScore: 0.87, explanation: "Visual design portfolio match", saved: false,
  },
  {
    id: "d4", title: "Interaction Design Intern", company: "Apple",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/0/747.png",
    location: "Cupertino, US", workMode: "hybrid", duration: "16 Weeks",
    salary: "$6,500/mo", description: "Craft intuitive interactions for iOS and macOS.",
    requirements: ["SwiftUI", "Prototyping", "Motion Design"],
    skills: ["SwiftUI", "Principle", "Figma", "Motion Design"],
    postedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    applicantsCount: 12, source: "LinkedIn", url: "#",
    relevanceScore: 0.89, explanation: "Motion design + prototyping skills match", saved: false,
  },
  {
    id: "d5", title: "DesignOps Intern", company: "Figma",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    location: "San Francisco, US", workMode: "remote", duration: "12 Weeks",
    salary: "$5,500/mo", description: "Build design infrastructure and plugin ecosystems.",
    requirements: ["JavaScript", "Design Systems", "Plugin Dev"],
    skills: ["JavaScript", "TypeScript", "Figma API", "Design Systems"],
    postedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    applicantsCount: 6, source: "Company Page", url: "#",
    relevanceScore: 0.85, explanation: "Figma API + design systems experience", saved: false,
  },
  {
    id: "d6", title: "UX Research Intern", company: "Meta",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
    location: "Menlo Park, US", workMode: "hybrid", duration: "14 Weeks",
    salary: "$5,800/mo", description: "Conduct user studies for VR/AR products.",
    requirements: ["User Research", "Usability Testing", "Data Analysis"],
    skills: ["User Research", "Usability Testing", "SPSS", "Figma"],
    postedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    applicantsCount: 9, source: "LinkedIn", url: "#",
    relevanceScore: 0.83, explanation: "User research specialization detected", saved: false,
  },
];

const ENGINEERING_INTERNSHIPS: Internship[] = [
  {
    id: "e1", title: "Frontend Engineering Intern", company: "Vercel",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
    location: "San Francisco, US", workMode: "hybrid", duration: "16 Weeks",
    salary: "$7,500/mo", description: "Build the future of web development platforms.",
    requirements: ["Next.js", "TypeScript", "Tailwind"],
    skills: ["Next.js", "TypeScript", "Tailwind", "React Server Components"],
    postedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    applicantsCount: 22, source: "LinkedIn", url: "#",
    relevanceScore: 0.95, explanation: "Perfect stack match: Next.js + TypeScript + Tailwind", saved: false,
  },
  {
    id: "e2", title: "Full Stack Intern", company: "Shopify",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968854.png",
    location: "Toronto, CA", workMode: "remote", duration: "Insight",
    salary: "$4,200/mo", description: "Build merchant-facing tools with Ruby on Rails and React.",
    requirements: ["Ruby", "React", "GraphQL"],
    skills: ["Ruby on Rails", "React", "GraphQL", "PostgreSQL"],
    postedAt: new Date(Date.now() - 7 * 3600000).toISOString(),
    applicantsCount: 18, source: "Wellfound", url: "#",
    relevanceScore: 0.88, explanation: "Full stack experience with React aligns", saved: false,
  },
  {
    id: "e3", title: "Backend Engineering Intern", company: "Stripe",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968306.png",
    location: "Dublin, IE", workMode: "onsite", duration: "Competitive",
    salary: "€3,200/mo", description: "Build payment infrastructure at scale.",
    requirements: ["Go", "Distributed Systems", "PostgreSQL"],
    skills: ["Go", "Ruby", "PostgreSQL", "Redis", "Kafka"],
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    applicantsCount: 11, source: "Indeed", url: "#",
    relevanceScore: 0.82, explanation: "Backend systems interest detected", saved: false,
  },
  {
    id: "e4", title: "Mobile Engineering Intern", company: "Spotify",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    location: "Stockholm, SE", workMode: "hybrid", duration: "12 Weeks",
    salary: "€2,900/mo", description: "Build features for 500M+ users on iOS/Android.",
    requirements: ["Swift", "Kotlin", "Mobile Architecture"],
    skills: ["Swift", "Kotlin", "Jetpack Compose", "SwiftUI"],
    postedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    applicantsCount: 14, source: "LinkedIn", url: "#",
    relevanceScore: 0.79, explanation: "Mobile development skills present", saved: false,
  },
  {
    id: "e5", title: "DevOps Intern", company: "Datadog",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968525.png",
    location: "New York, US", workMode: "remote", duration: "14 Weeks",
    salary: "$6,200/mo", description: "Automate infrastructure and observability pipelines.",
    requirements: ["Kubernetes", "Terraform", "Go"],
    skills: ["Kubernetes", "Terraform", "AWS", "Go", "Prometheus"],
    postedAt: new Date(Date.now() - 14 * 3600000).toISOString(),
    applicantsCount: 7, source: "Company Page", url: "#",
    relevanceScore: 0.76, explanation: "Infrastructure skills noted", saved: false,
  },
  {
    id: "e6", title: "Security Engineering Intern", company: "Cloudflare",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    location: "Austin, US", workMode: "hybrid", duration: "12 Weeks",
    salary: "$6,800/mo", description: "Protect the internet from DDoS and bot attacks.",
    requirements: ["Rust", "Network Security", "Cryptography"],
    skills: ["Rust", "Go", "Network Security", "Cryptography"],
    postedAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    applicantsCount: 5, source: "LinkedIn", url: "#",
    relevanceScore: 0.74, explanation: "Security interest in profile", saved: false,
  },
];

const ML_INTERNSHIPS: Internship[] = [
  {
    id: "m1", title: "AI/ML Research Intern", company: "OpenAI",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/12220/12220289.png",
    location: "Remote", workMode: "remote", duration: "6 Months",
    salary: "$8,000/mo", description: "Research on large language models and alignment.",
    requirements: ["PyTorch", "Python", "Research"],
    skills: ["PyTorch", "Python", "Transformers", "Deep Learning"],
    postedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    applicantsCount: 45, source: "Company Page", url: "#",
    relevanceScore: 0.96, explanation: "PyTorch + Transformers = perfect match", saved: false,
  },
  {
    id: "m2", title: "Machine Learning Intern", company: "Google DeepMind",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    location: "London, UK", workMode: "hybrid", duration: "12 Weeks",
    salary: "£3,200/mo", description: "Reinforcement learning for game-playing agents.",
    requirements: ["TensorFlow", "JAX", "Reinforcement Learning"],
    skills: ["TensorFlow", "JAX", "Python", "Reinforcement Learning"],
    postedAt: new Date(Date.now() - 9 * 3600000).toISOString(),
    applicantsCount: 28, source: "LinkedIn", url: "#",
    relevanceScore: 0.90, explanation: "Deep learning research background", saved: false,
  },
  {
    id: "m3", title: "NLP Engineering Intern", company: "Hugging Face",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968525.png",
    location: "Paris, FR", workMode: "remote", duration: "Insight",
    salary: "€2,500/mo", description: "Build open-source tools for the ML community.",
    requirements: ["Transformers", "Python", "Open Source"],
    skills: ["Transformers", "Python", "Rust", "Git", "CI/CD"],
    postedAt: new Date(Date.now() - 11 * 3600000).toISOString(),
    applicantsCount: 19, source: "Wellfound", url: "#",
    relevanceScore: 0.87, explanation: "NLP + open source contribution match", saved: false,
  },
  {
    id: "m4", title: "Computer Vision Intern", company: "Tesla",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968276.png",
    location: "Palo Alto, US", workMode: "onsite", duration: "16 Weeks",
    salary: "$7,200/mo", description: "Train perception models for autonomous driving.",
    requirements: ["PyTorch", "CUDA", "Computer Vision"],
    skills: ["PyTorch", "OpenCV", "CUDA", "C++", "ROS"],
    postedAt: new Date(Date.now() - 15 * 3600000).toISOString(),
    applicantsCount: 32, source: "LinkedIn", url: "#",
    relevanceScore: 0.84, explanation: "Computer vision skills detected", saved: false,
  },
  {
    id: "m5", title: "MLOps Intern", company: "Databricks",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    location: "San Francisco, US", workMode: "hybrid", duration: "12 Weeks",
    salary: "$6,500/mo", description: "Build ML pipelines and model serving infrastructure.",
    requirements: ["Spark", "MLflow", "Kubernetes"],
    skills: ["Spark", "MLflow", "Kubernetes", "Python", "Airflow"],
    postedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
    applicantsCount: 13, source: "Company Page", url: "#",
    relevanceScore: 0.81, explanation: "MLOps tooling experience noted", saved: false,
  },
  {
    id: "m6", title: "Applied Scientist Intern", company: "Amazon",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968269.png",
    location: "Seattle, US", workMode: "hybrid", duration: "14 Weeks",
    salary: "$7,800/mo", description: "Improve recommendation systems for 300M+ customers.",
    requirements: ["Deep Learning", "Recommendation Systems", "Python"],
    skills: ["TensorFlow", "Python", "Spark", "Recommendation Systems"],
    postedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    applicantsCount: 38, source: "LinkedIn", url: "#",
    relevanceScore: 0.78, explanation: "ML applied to real-world problems", saved: false,
  },
];

const DATA_INTERNSHIPS: Internship[] = [
  {
    id: "da1", title: "Data Science Intern", company: "Netflix",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
    location: "Los Gatos, US", workMode: "hybrid", duration: "12 Weeks",
    salary: "$6,800/mo", description: "Analyze viewing patterns to improve content recommendations.",
    requirements: ["Python", "SQL", "Statistics", "A/B Testing"],
    skills: ["Python", "SQL", "Pandas", "Spark", "Statistics"],
    postedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    applicantsCount: 25, source: "LinkedIn", url: "#",
    relevanceScore: 0.86, explanation: "Data analysis + Python skills match", saved: false,
  },
  {
    id: "da2", title: "Data Engineering Intern", company: "Snowflake",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/5968/5968525.png",
    location: "Remote", workMode: "remote", duration: "Insight",
    salary: "$5,500/mo", description: "Build data pipelines for cloud analytics.",
    requirements: ["SQL", "Python", "ETL", "Cloud"],
    skills: ["SQL", "Python", "Airflow", "dbt", "AWS"],
    postedAt: new Date(Date.now() - 13 * 3600000).toISOString(),
    applicantsCount: 10, source: "Wellfound", url: "#",
    relevanceScore: 0.80, explanation: "Data pipeline skills present", saved: false,
  },
];

const ALL_INTERNSHIPS: Internship[] = [
  ...DESIGN_INTERNSHIPS,
  ...ENGINEERING_INTERNSHIPS,
  ...ML_INTERNSHIPS,
  ...DATA_INTERNSHIPS,
];

// ─── RECOMMENDATION ENGINE ───

function detectDomain(skills: string[], technologies: string[]): string {
  const all = [...skills, ...technologies].map((s) => s.toLowerCase());
  const scores = { design: 0, engineering: 0, ml: 0, data: 0 };

  const designKeywords = ["figma", "sketch", "adobe", "design", "ui", "ux", "prototype", "visual", "brand", "illustrator", "photoshop"];
  const engKeywords = ["react", "next.js", "javascript", "typescript", "node", "frontend", "backend", "full stack", "go", "rust", "swift", "kotlin", "mobile", "devops", "kubernetes"];
  const mlKeywords = ["python", "pytorch", "tensorflow", "machine learning", "ml", "nlp", "transformers", "deep learning", "computer vision", "reinforcement learning", "jax"];
  const dataKeywords = ["sql", "pandas", "data", "analytics", "statistics", "etl", "spark", "airflow"];

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
  internship: Internship,
  resumeSkills: string[],
  resumeTechnologies: string[],
  dislikedTopics: string[]
): Internship {
  const userTerms = [...resumeSkills, ...resumeTechnologies].map((s) => s.toLowerCase());
  const internTerms = [...internship.skills, ...internship.requirements].map((s) => s.toLowerCase());

  const matches = internTerms.filter((t) => userTerms.some((u) => t.includes(u) || u.includes(t)));
  const matchRatio = matches.length / Math.max(internTerms.length, 1);

  let score = 0.5 + matchRatio * 0.45;

  const titleCompany = `${internship.title} ${internship.company}`.toLowerCase();
  const hasDisliked = dislikedTopics.some((topic) => titleCompany.includes(topic.toLowerCase()));
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

  return { ...internship, relevanceScore: Math.round(score * 100) / 100, explanation };
}

export function getRecommendedInternships(
  resumeSkills: string[],
  resumeTechnologies: string[],
  resumeDomains: string[],
  dislikedTopics: string[],
  filters?: FilterState,
  searchQuery?: string
): { forYou: Internship[]; trending: Internship[]; recent: Internship[] } {
  const domain = detectDomain(resumeSkills, resumeTechnologies);

  let pool: Internship[] = [];
  switch (domain) {
    case "design":
      pool = [...DESIGN_INTERNSHIPS, ...ENGINEERING_INTERNSHIPS.slice(0, 2)];
      break;
    case "ml":
      pool = [...ML_INTERNSHIPS, ...DATA_INTERNSHIPS, ...ENGINEERING_INTERNSHIPS.slice(0, 2)];
      break;
    case "data":
      pool = [...DATA_INTERNSHIPS, ...ML_INTERNSHIPS.slice(0, 3), ...ENGINEERING_INTERNSHIPS.slice(0, 2)];
      break;
    case "engineering":
    default:
      pool = [...ENGINEERING_INTERNSHIPS, ...ML_INTERNSHIPS.slice(0, 2), ...DESIGN_INTERNSHIPS.slice(0, 2)];
      break;
  }

  let scored = pool.map((i) => scoreInternship(i, resumeSkills, resumeTechnologies, dislikedTopics));

  if (filters?.workMode?.length) {
    scored = scored.filter((i) => filters.workMode!.includes(i.workMode));
  }
  if (filters?.maxApplicants) {
    scored = scored.filter((i) => i.applicantsCount <= filters.maxApplicants!);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    scored = scored.filter((i) =>
      i.title.toLowerCase().includes(q) ||
      i.company.toLowerCase().includes(q) ||
      i.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const visible = scored.filter((i) => i.relevanceScore > 0.15);

  return {
    forYou: visible.slice(0, 6),
    trending: [...visible].sort((a, b) => b.applicantsCount - a.applicantsCount).slice(0, 4),
    recent: [...visible].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()).slice(0, 4),
  };
}

export function getAllInternships(): Internship[] {
  return ALL_INTERNSHIPS;
}

export { detectDomain };