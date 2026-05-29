"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAppStore } from "@/lib/store";
import { updatePreferences } from "@/lib/api";
import { WorkMode, ExperienceLevel } from "@/types";

export default function ProfilePage() {
  const { user, filters, setFilters } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"preferences" | "memory" | "resumes">("preferences");

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await updatePreferences({
        work_mode: filters.workMode,
        experience_level: filters.experienceLevel,
        max_applicants: filters.maxApplicants,
        require_resume: filters.requireResume,
        require_linkedin: filters.requireLinkedIn,
        require_github: filters.requireGitHub,
      });
      setSavedMessage("Preferences saved successfully!");
      setTimeout(() => setSavedMessage(null), 3000);
    } catch {
      setSavedMessage("Saved locally (API unavailable)");
      setTimeout(() => setSavedMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const toggleWorkMode = (mode: WorkMode) => {
    const current = filters.workMode;
    if (current.includes(mode)) {
      setFilters({ workMode: current.filter((m) => m !== mode) });
    } else {
      setFilters({ workMode: [...current, mode] });
    }
  };

  // Mock preference memory
  const memoryData = {
    likedInternships: ["Airbnb Product Design", "OpenAI ML Research"],
    dislikedInternships: ["Claude-related roles", "Sales internships"],
    excludedTopics: ["Claude", "Sales", "DevOps"],
    preferredDomains: ["Product Design", "Machine Learning", "Frontend Engineering"],
    preferredLocations: ["Remote", "London", "San Francisco"],
    salaryMin: 2000,
    salaryMax: 8000,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopAppBar />

      <main className="max-w-2xl mx-auto pt-24 px-margin-mobile">
        <header className="mb-6">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">Profile</h2>
          <p className="text-body-md text-on-surface-variant">Manage your preferences and AI memory.</p>
        </header>

        {/* Profile Card */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant mb-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-secondary-container overflow-hidden border-2 border-outline-variant">
            <img
              src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface">{user?.name || "User"}</h3>
            <p className="text-body-md text-on-surface-variant">{user?.email || "user@example.com"}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-primary-container text-on-primary-container chip">{user?.resumes?.length || 0} Resumes</span>
              <span className="bg-secondary-container text-on-secondary-container chip">Active</span>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 bg-surface-container-low p-1 rounded-xl">
          {(["preferences", "memory", "resumes"] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-2 rounded-lg text-label-md font-label-md capitalize transition-colors ${
                activeSection === section
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Preferences Section */}
        {activeSection === "preferences" && (
          <section className="space-y-6">
            {savedMessage && (
              <div className="bg-primary-container text-on-primary-container px-4 py-3 rounded-xl text-body-md animate-fade-in">
                {savedMessage}
              </div>
            )}

            {/* Work Mode */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Work Mode</h3>
              <div className="flex flex-wrap gap-3">
                {(["remote", "hybrid", "onsite"] as WorkMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => toggleWorkMode(mode)}
                    className={`px-4 py-2 rounded-full text-label-md font-semibold capitalize transition-colors ${
                      filters.workMode.includes(mode)
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Experience Level</h3>
              <div className="grid grid-cols-2 gap-3">
                {(["entry", "moderate", "senior", "lead"] as ExperienceLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilters({ experienceLevel: level })}
                    className={`px-4 py-3 rounded-xl text-label-md font-semibold capitalize transition-colors ${
                      filters.experienceLevel === level
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    {level}-level
                  </button>
                ))}
              </div>
            </div>

            {/* Application Requirements */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Application Requirements</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-body-md text-on-surface">Require Resume</span>
                  <input
                    type="checkbox"
                    checked={filters.requireResume}
                    onChange={(e) => setFilters({ requireResume: e.target.checked })}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-body-md text-on-surface">Require LinkedIn</span>
                  <input
                    type="checkbox"
                    checked={filters.requireLinkedIn}
                    onChange={(e) => setFilters({ requireLinkedIn: e.target.checked })}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-body-md text-on-surface">Require GitHub</span>
                  <input
                    type="checkbox"
                    checked={filters.requireGitHub}
                    onChange={(e) => setFilters({ requireGitHub: e.target.checked })}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            {/* Max Applicants */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Competition Filter</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={filters.maxApplicants}
                  onChange={(e) => setFilters({ maxApplicants: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
                />
                <span className="text-headline-sm font-headline-sm text-primary w-16 text-right">
                  {filters.maxApplicants}
                </span>
              </div>
              <p className="text-label-sm text-outline mt-2">Only show internships with fewer applicants</p>
            </div>

            <button
              onClick={handleSavePreferences}
              disabled={saving}
              className="w-full h-14 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <MaterialIcon icon="sync" className="animate-spin" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <MaterialIcon icon="save" size={20} />
                  Save Preferences
                </>
              )}
            </button>
          </section>
        )}

        {/* Memory Section */}
        {activeSection === "memory" && (
          <section className="space-y-6">
            {/* Excluded Topics */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-headline-sm font-headline-sm text-on-surface">Excluded Topics</h3>
                <span className="text-label-sm text-outline">Negative Preferences</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {memoryData.excludedTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1.5 bg-error-container text-on-error-container rounded-full text-label-md font-semibold flex items-center gap-1"
                  >
                    <MaterialIcon icon="block" size={14} />
                    {topic}
                  </span>
                ))}
                <button className="px-3 py-1.5 bg-surface-container-high text-outline rounded-full text-label-md hover:bg-surface-container transition-colors">
                  + Add
                </button>
              </div>
              <p className="text-label-sm text-outline mt-3">
                These topics are permanently excluded from your recommendations. Set via chatbot or manually.
              </p>
            </div>

            {/* Preferred Domains */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Preferred Domains</h3>
              <div className="flex flex-wrap gap-2">
                {memoryData.preferredDomains.map((domain) => (
                  <span
                    key={domain}
                    className="px-3 py-1.5 bg-primary-container text-on-primary-container rounded-full text-label-md font-semibold"
                  >
                    {domain}
                  </span>
                ))}
                <button className="px-3 py-1.5 bg-surface-container-high text-outline rounded-full text-label-md hover:bg-surface-container transition-colors">
                  + Add
                </button>
              </div>
            </div>

            {/* Preferred Locations */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Preferred Locations</h3>
              <div className="flex flex-wrap gap-2">
                {memoryData.preferredLocations.map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-label-md font-semibold"
                  >
                    {loc}
                  </span>
                ))}
                <button className="px-3 py-1.5 bg-surface-container-high text-outline rounded-full text-label-md hover:bg-surface-container transition-colors">
                  + Add
                </button>
              </div>
            </div>

            {/* Interaction History */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Interaction History</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-container-high rounded-lg">
                  <div className="flex items-center gap-2">
                    <MaterialIcon icon="thumb_up" className="text-primary" size={18} />
                    <span className="text-body-md text-on-surface">Liked Internships</span>
                  </div>
                  <span className="text-headline-sm font-headline-sm text-primary">{memoryData.likedInternships.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-high rounded-lg">
                  <div className="flex items-center gap-2">
                    <MaterialIcon icon="thumb_down" className="text-error" size={18} />
                    <span className="text-body-md text-on-surface">Disliked Internships</span>
                  </div>
                  <span className="text-headline-sm font-headline-sm text-error">{memoryData.dislikedInternships.length}</span>
                </div>
              </div>
            </div>

            {/* Salary Range */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-4">Salary Expectation</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-label-sm text-outline">Min ($/mo)</label>
                  <input
                    type="number"
                    defaultValue={memoryData.salaryMin}
                    className="w-full bg-surface-container-high border border-outline-variant rounded-lg px-3 py-2 text-body-md mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-label-sm text-outline">Max ($/mo)</label>
                  <input
                    type="number"
                    defaultValue={memoryData.salaryMax}
                    className="w-full bg-surface-container-high border border-outline-variant rounded-lg px-3 py-2 text-body-md mt-1"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Resumes Section */}
        {activeSection === "resumes" && (
          <section className="space-y-4">
            {user?.resumes?.map((resume) => (
              <div
                key={resume.id}
                className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary-container flex items-center justify-center">
                    <MaterialIcon icon="description" className="text-on-primary-container" size={24} />
                  </div>
                  <div>
                    <h4 className="text-body-md font-semibold text-on-surface">{resume.filename}</h4>
                    <p className="text-label-sm text-outline">
                      Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                    {resume.parsedData && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {resume.parsedData.skills?.slice(0, 3).map((skill: string) => (
                          <span key={skill} className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded text-label-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.id === user.activeResumeId && (
                    <span className="px-2 py-1 bg-primary text-on-primary rounded-full text-label-sm font-semibold">
                      Active
                    </span>
                  )}
                  <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-outline">
                    <MaterialIcon icon="more_vert" size={20} />
                  </button>
                </div>
              </div>
            ))}

            {!user?.resumes?.length && (
              <div className="flex flex-col items-center py-12 text-center">
                <MaterialIcon icon="description" className="text-outline mb-4" size={48} />
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">No resumes yet</h3>
                <p className="text-body-md text-on-surface-variant max-w-xs mb-4">
                  Upload your first resume to get personalized recommendations.
                </p>
                <Link
                  href="/"
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl text-label-md font-semibold hover:bg-surface-tint transition-colors"
                >
                  Upload Resume
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Danger Zone */}
        <div className="mt-8 bg-error-container p-4 rounded-xl border border-error/20">
          <h3 className="text-headline-sm font-headline-sm text-on-error-container mb-2">Danger Zone</h3>
          <p className="text-body-md text-on-error-container/80 mb-4">
            Clear all preference memory and start fresh. This cannot be undone.
          </p>
          <button className="px-4 py-2 bg-error text-on-error rounded-lg text-label-md font-semibold hover:bg-error/90 transition-colors">
            Clear All Memory
          </button>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
