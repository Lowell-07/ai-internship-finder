"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { ChatPanel } from "@/components/ChatPanel";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAppStore } from "@/lib/store";
import { toggleSaveInternship, rateInternship } from "@/lib/api";
import { getRecommendedInternships } from "@/lib/recommendations";
import { Internship, WorkMode } from "@/types";
import { formatDate, getWorkModeColor, getWorkModeLabel } from "@/lib/utils";

export default function DiscoveryPage() {
  const {
    filters,
    setFilters,
    resetFilters,
    savedInternships,
    toggleSaved,
    chatOpen,
    setChatOpen,
    resumeSkills,
    resumeTechnologies,
    resumeDomains,
    dislikedTopics,
    addLikedId,
    addDislikedId,
  } = useAppStore();

  const [forYou, setForYou] = useState<Internship[]>([]);
  const [trending, setTrending] = useState<Internship[]>([]);
  const [recent, setRecent] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"foryou" | "trending" | "recent">("foryou");

  const loadRecommendations = useCallback(() => {
    setLoading(true);
    const skills = resumeSkills.length > 0 ? resumeSkills : ["React", "TypeScript", "Figma"];
    const techs = resumeTechnologies.length > 0 ? resumeTechnologies : ["React", "Next.js"];
    const domains = resumeDomains.length > 0 ? resumeDomains : ["Frontend Engineering"];

    const results = getRecommendedInternships(skills, techs, domains, dislikedTopics, filters, searchQuery);

    setForYou(results.forYou);
    setTrending(results.trending);
    setRecent(results.recent);
    setLoading(false);
  }, [resumeSkills, resumeTechnologies, resumeDomains, dislikedTopics, filters, searchQuery]);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  const handleToggleSave = async (id: string) => {
    toggleSaved(id);
    try { await toggleSaveInternship(id); } catch {}
  };

  const handleRate = async (id: string, rating: "like" | "dislike") => {
    if (rating === "like") addLikedId(id);
    else addDislikedId(id);
    try { await rateInternship(id, rating); } catch {}
    setTimeout(loadRecommendations, 300);
  };

  const toggleWorkMode = (mode: WorkMode) => {
    const current = filters.workMode;
    if (current.includes(mode)) {
      setFilters({ workMode: current.filter((m) => m !== mode) });
    } else {
      setFilters({ workMode: [...current, mode] });
    }
  };

  const currentList = activeTab === "foryou" ? forYou : activeTab === "trending" ? trending : recent;

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopAppBar />

      <main className="max-w-2xl mx-auto pt-24 px-margin-mobile">
        <header className="mb-6">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">Discovery</h2>
          <p className="text-body-md text-on-surface-variant">
            {resumeDomains.length > 0
              ? `Handpicked opportunities matching your ${resumeDomains[0]} profile.`
              : "Handpicked opportunities matching your profile."}
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-4 relative">
          <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5">
            <MaterialIcon icon="search" className="text-outline" size={20} />
            <input
              type="text"
              placeholder="Search roles, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-body-md text-on-surface placeholder:text-outline outline-none"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 rounded-lg transition-colors ${showFilters ? "bg-primary text-on-primary" : "hover:bg-surface-container-high"}`}
            >
              <MaterialIcon icon="tune" size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <section className="mb-6 space-y-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-outline font-semibold uppercase">Under (N) Applications</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.maxApplicants}
                    onChange={(e) => setFilters({ maxApplicants: parseInt(e.target.value) || 0 })}
                    className="w-20 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-primary px-3 py-1.5 outline-none"
                  />
                  <span className="text-label-md text-on-surface-variant">applicants</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm text-outline font-semibold uppercase">Experience Level</label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => setFilters({ experienceLevel: e.target.value as any })}
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-primary px-3 py-1.5 outline-none"
                >
                  <option value="entry">Entry-level</option>
                  <option value="moderate">Moderate</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-outline-variant/30">
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-outline font-semibold uppercase">Employment Type</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {(["remote", "hybrid", "onsite"] as WorkMode[]).map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.workMode.includes(mode)}
                        onChange={() => toggleWorkMode(mode)}
                        className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-body-md capitalize">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-outline font-semibold uppercase">Application Requirements</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={filters.requireResume} onChange={(e) => setFilters({ requireResume: e.target.checked })} className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" />
                    <span className="text-body-md">Resume</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={filters.requireLinkedIn} onChange={(e) => setFilters({ requireLinkedIn: e.target.checked })} className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" />
                    <span className="text-body-md">LinkedIn</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={filters.requireGitHub} onChange={(e) => setFilters({ requireGitHub: e.target.checked })} className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" />
                    <span className="text-body-md">GitHub</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={resetFilters} className="text-label-md text-primary hover:text-surface-tint transition-colors">Reset Filters</button>
            </div>
          </section>
        )}

        {/* Feed Tabs */}
        <div className="flex gap-2 mb-6 bg-surface-container-low p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("foryou")}
            className={`flex-1 py-2 rounded-lg text-label-md font-label-md transition-colors flex items-center justify-center gap-1 ${activeTab === "foryou" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            <MaterialIcon icon="auto_awesome" size={16} />
            For You
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 py-2 rounded-lg text-label-md font-label-md transition-colors flex items-center justify-center gap-1 ${activeTab === "trending" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            <MaterialIcon icon="trending_up" size={16} />
            Trending
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={`flex-1 py-2 rounded-lg text-label-md font-label-md transition-colors flex items-center justify-center gap-1 ${activeTab === "recent" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            <MaterialIcon icon="schedule" size={16} />
            Recent
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-label-md text-outline">
            {activeTab === "foryou" && `${forYou.length} personalized matches`}
            {activeTab === "trending" && `${trending.length} trending now`}
            {activeTab === "recent" && `${recent.length} just posted`}
          </span>
          <div className="flex items-center gap-2">
            <MaterialIcon icon="sort" className="text-outline" size={18} />
            <span className="text-label-sm text-outline">Relevance</span>
          </div>
        </div>

        {/* Listings */}
        <section className="flex flex-col gap-base">
          {loading ? (
            <div className="flex flex-col items-center py-12 gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-body-md text-outline">Finding matches...</p>
            </div>
          ) : currentList.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <MaterialIcon icon="search_off" className="text-outline mb-4" size={48} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">No matches found</h3>
              <p className="text-body-md text-on-surface-variant max-w-xs">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            currentList.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} isSaved={savedInternships.includes(internship.id)} onToggleSave={() => handleToggleSave(internship.id)} onRate={handleRate} />
            ))
          )}
        </section>
      </main>

      <div className="fixed bottom-28 right-6 z-50">
        <button onClick={() => setChatOpen(!chatOpen)} className="bg-primary text-on-primary h-14 w-14 rounded-full shadow-lg flex items-center justify-center hover:bg-surface-tint transition-all active:scale-95">
          <MaterialIcon icon="chat_bubble" size={28} />
        </button>
      </div>

      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}

      <BottomNavBar />
    </div>
  );
}

function InternshipCard({ internship, isSaved, onToggleSave, onRate }: { internship: Internship; isSaved: boolean; onToggleSave: () => void; onRate: (id: string, rating: "like" | "dislike") => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-surface-container-lowest p-4 rounded-xl resume-shadow card-hover group animate-fade-in">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high">
          <img src={internship.companyLogo || "/placeholder-logo.png"} alt={`${internship.company} Logo`} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/48?text=${internship.company[0]}`; }} />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <h3 className="text-headline-sm font-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{internship.title}</h3>
              <p className="text-body-md font-semibold text-secondary">{internship.company}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className="text-label-sm text-outline">{formatDate(internship.postedAt)}</span>
              <button onClick={onToggleSave} className="p-1 rounded-full hover:bg-surface-container-high transition-colors">
                <MaterialIcon icon={isSaved ? "bookmark" : "bookmark_border"} filled={isSaved} className={isSaved ? "text-primary" : "text-outline"} size={20} />
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 text-on-surface-variant">
              <MaterialIcon icon="location_on" size={16} />
              <span className="text-label-md">{internship.location}</span>
            </div>
            <span className={`chip ${getWorkModeColor(internship.workMode)}`}>{getWorkModeLabel(internship.workMode)}</span>
            <span className="bg-surface-container-high text-on-surface-variant chip">{internship.duration}</span>
            {internship.applicantsCount <= 10 && <span className="bg-primary-container text-on-primary-container chip">Low competition</span>}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${internship.relevanceScore * 100}%` }} />
            </div>
            <span className="text-label-sm text-primary font-semibold">{Math.round(internship.relevanceScore * 100)}%</span>
          </div>
          <p className="mt-1.5 text-label-sm text-on-surface-variant italic">{internship.explanation}</p>
          {expanded && (
            <div className="mt-3 pt-3 border-t border-outline-variant space-y-3 animate-slide-up">
              <p className="text-body-md text-on-surface">{internship.description}</p>
              <div>
                <h4 className="text-label-md font-semibold text-on-surface mb-1">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {internship.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md text-label-sm">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-md font-semibold text-secondary">{internship.salary}</span>
                <div className="flex gap-2">
                  <button onClick={() => onRate(internship.id, "dislike")} className="p-2 rounded-full hover:bg-error-container text-outline hover:text-error transition-colors" title="Not interested">
                    <MaterialIcon icon="thumb_down" size={18} />
                  </button>
                  <button onClick={() => onRate(internship.id, "like")} className="p-2 rounded-full hover:bg-primary-container text-outline hover:text-primary transition-colors" title="Interested">
                    <MaterialIcon icon="thumb_up" size={18} />
                  </button>
                  <a href={internship.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-surface-tint transition-colors">Apply</a>
                </div>
              </div>
            </div>
          )}
          <button onClick={() => setExpanded(!expanded)} className="mt-2 text-label-md text-primary hover:text-surface-tint transition-colors flex items-center gap-1">
            <MaterialIcon icon={expanded ? "expand_less" : "expand_more"} size={18} />
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </article>
  );
}
