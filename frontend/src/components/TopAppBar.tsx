"use client";

import React, { useState, useRef, useEffect } from "react";
import { MaterialIcon } from "./MaterialIcon";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopAppBar() {
  const { user, activeResumeId, setActiveResumeId, darkMode, toggleDarkMode } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const resumes = user?.resumes || [];
  const activeResume = resumes.find((r) => r.id === activeResumeId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-topbar h-16 flex justify-between items-center px-margin-mobile md:px-8">
      <div className="flex items-center gap-3">
        {/* Resume Selector */}
        {pathname !== "/" && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full hover:bg-surface-container-high transition-colors border border-outline-variant"
            >
              <MaterialIcon icon="description" className="text-primary" size={20} />
              <span className="text-label-md font-label-md text-on-surface truncate max-w-[140px] md:max-w-xs">
                {activeResume?.filename || "Select Resume"}
              </span>
              <MaterialIcon icon="arrow_drop_down" className="text-outline" size={20} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg overflow-hidden animate-fade-in">
                <div className="p-2 border-b border-outline-variant bg-surface-container-low">
                  <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
                    Select Active Resume
                  </span>
                </div>
                <div className="flex flex-col">
                  {resumes.map((resume) => (
                    <button
                      key={resume.id}
                      onClick={() => {
                        setActiveResumeId(resume.id);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 text-left hover:bg-surface-container-high transition-colors"
                    >
                      <MaterialIcon
                        icon={resume.id === activeResumeId ? "check_circle" : "article"}
                        className={resume.id === activeResumeId ? "text-primary" : "text-outline"}
                        filled={resume.id === activeResumeId}
                      />
                      <div className="flex flex-col">
                        <span className="text-body-md font-bold">{resume.filename}</span>
                        <span className="text-label-sm text-outline">
                          Modified {new Date(resume.modifiedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 p-3 bg-primary text-on-primary font-label-md hover:bg-surface-tint transition-colors"
                >
                  <MaterialIcon icon="add" size={18} />
                  Upload New Resume
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Brand */}
        <Link href="/discovery" className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
            <MaterialIcon icon="avatar" className="text-on-primary-container" size={20} />
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary">
            InternMatch
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant"
        >
          <MaterialIcon icon={darkMode ? "light_mode" : "dark_mode"} />
        </button>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant relative">
          <MaterialIcon icon="notifications" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>
        <div className="h-10 w-10 rounded-full bg-secondary-container overflow-hidden border-2 border-outline-variant">
          <img
            src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
