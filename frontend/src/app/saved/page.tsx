"use client";

import React, { useState } from "react";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAppStore } from "@/lib/store";
import { getWorkModeColor, getWorkModeLabel } from "@/lib/utils";
import { getAllInternships } from "@/lib/recommendations";

export default function SavedPage() {
  const { savedInternships, toggleSaved, dislikedInternshipIds } = useAppStore();
  const [activeTab, setActiveTab] = useState<"saved" | "applied" | "rejected">("saved");

  const all = getAllInternships();
  const saved = all.filter((i) => savedInternships.includes(i.id));
  const rejected = all.filter((i) => dislikedInternshipIds.includes(i.id));

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopAppBar />

      <main className="max-w-2xl mx-auto pt-24 px-margin-mobile">
        <header className="mb-6">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">Saved</h2>
          <p className="text-body-md text-on-surface-variant">Manage your bookmarked opportunities.</p>
        </header>

        <div className="flex gap-2 mb-6 bg-surface-container-low p-1 rounded-xl">
          {(["saved", "applied", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-label-md font-label-md capitalize transition-colors ${
                activeTab === tab ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="flex flex-col gap-base">
          {activeTab === "saved" && saved.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <MaterialIcon icon="bookmark_border" className="text-outline mb-4" size={48} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">No saved internships</h3>
              <p className="text-body-md text-on-surface-variant max-w-xs">Browse the Discovery feed and tap the bookmark icon to save opportunities.</p>
            </div>
          )}

          {activeTab === "saved" && saved.map((internship) => (
            <article key={internship.id} className="bg-surface-container-lowest p-4 rounded-xl resume-shadow card-hover">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high">
                  <img src={internship.companyLogo || "/placeholder-logo.png"} alt={`${internship.company} Logo`} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/48?text=${internship.company[0]}`; }} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-headline-sm font-headline-sm text-on-surface">{internship.title}</h3>
                      <p className="text-body-md font-semibold text-secondary">{internship.company}</p>
                    </div>
                    <button onClick={() => toggleSaved(internship.id)} className="p-1 rounded-full hover:bg-surface-container-high transition-colors">
                      <MaterialIcon icon="bookmark" filled className="text-primary" size={20} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <MaterialIcon icon="location_on" size={16} />
                      <span className="text-label-md">{internship.location}</span>
                    </div>
                    <span className={`chip ${getWorkModeColor(internship.workMode)}`}>{getWorkModeLabel(internship.workMode)}</span>
                    <span className="bg-surface-container-high text-on-surface-variant chip">{internship.duration}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-body-md font-semibold text-secondary">{internship.salary}</span>
                    <a href={internship.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-surface-tint transition-colors">Apply Now</a>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {activeTab === "applied" && (
            <div className="flex flex-col items-center py-16 text-center">
              <MaterialIcon icon="send" className="text-outline mb-4" size={48} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">No applications yet</h3>
              <p className="text-body-md text-on-surface-variant max-w-xs">Applications you submit through the platform will appear here.</p>
            </div>
          )}

          {activeTab === "rejected" && rejected.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <MaterialIcon icon="block" className="text-outline mb-4" size={48} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">No rejected internships</h3>
              <p className="text-body-md text-on-surface-variant max-w-xs">Internships you mark as not interested will be tracked here.</p>
            </div>
          )}

          {activeTab === "rejected" && rejected.map((internship) => (
            <article key={internship.id} className="bg-surface-container-lowest p-4 rounded-xl resume-shadow opacity-60">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high">
                  <img src={internship.companyLogo || "/placeholder-logo.png"} alt={`${internship.company} Logo`} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/48?text=${internship.company[0]}`; }} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-headline-sm font-headline-sm text-on-surface">{internship.title}</h3>
                      <p className="text-body-md font-semibold text-secondary">{internship.company}</p>
                    </div>
                    <span className="px-2 py-1 bg-error-container text-on-error-container rounded-full text-label-sm font-semibold">Excluded</span>
                  </div>
                  <p className="mt-2 text-label-sm text-error">Excluded based on your preferences</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
