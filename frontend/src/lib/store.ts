"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  UserProfile,
  Internship,
  ChatSession,
  ChatMessage,
  AgentStatus,
  FilterState,
  WorkMode,
  ExperienceLevel,
} from "@/types";

interface AppState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  activeResumeId: string | null;
  setActiveResumeId: (id: string | null) => void;

  internships: Internship[];
  setInternships: (items: Internship[]) => void;
  savedInternships: string[];
  toggleSaved: (id: string) => void;

  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;

  activeChatSession: string | null;
  setActiveChatSession: (id: string | null) => void;
  chatSessions: ChatSession[];
  setChatSessions: (sessions: ChatSession[]) => void;
  addMessageToSession: (sessionId: string, message: ChatMessage) => void;

  agentStatus: AgentStatus[];
  setAgentStatus: (status: AgentStatus[]) => void;

  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Resume-derived recommendation state
  resumeSkills: string[];
  resumeDomains: string[];
  resumeTechnologies: string[];
  setResumeProfile: (skills: string[], domains: string[], technologies: string[]) => void;

  // Preference memory
  dislikedTopics: string[];
  addDislikedTopic: (topic: string) => void;
  likedInternshipIds: string[];
  dislikedInternshipIds: string[];
  addLikedId: (id: string) => void;
  addDislikedId: (id: string) => void;
}

const defaultFilters: FilterState = {
  maxApplicants: 50,
  experienceLevel: "entry",
  workMode: ["remote", "hybrid"],
  requireResume: true,
  requireLinkedIn: false,
  requireGitHub: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      activeResumeId: null,
      setActiveResumeId: (id) => set({ activeResumeId: id }),

      internships: [],
      setInternships: (internships) => set({ internships }),
      savedInternships: [],
      toggleSaved: (id) =>
        set((state) => ({
          savedInternships: state.savedInternships.includes(id)
            ? state.savedInternships.filter((s) => s !== id)
            : [...state.savedInternships, id],
        })),

      filters: defaultFilters,
      setFilters: (partial) =>
        set((state) => ({ filters: { ...state.filters, ...partial } })),
      resetFilters: () => set({ filters: defaultFilters }),

      activeChatSession: null,
      setActiveChatSession: (id) => set({ activeChatSession: id }),
      chatSessions: [],
      setChatSessions: (sessions) => set({ chatSessions: sessions }),
      addMessageToSession: (sessionId, message) =>
        set((state) => ({
          chatSessions: state.chatSessions.map((s) =>
            s.id === sessionId
              ? { ...s, messages: [...s.messages, message] }
              : s
          ),
        })),

      agentStatus: [],
      setAgentStatus: (status) => set({ agentStatus: status }),

      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      resumeSkills: [],
      resumeDomains: [],
      resumeTechnologies: [],
      setResumeProfile: (skills, domains, technologies) =>
        set({ resumeSkills: skills, resumeDomains: domains, resumeTechnologies: technologies }),

      dislikedTopics: [],
      addDislikedTopic: (topic) =>
        set((state) => ({
          dislikedTopics: state.dislikedTopics.includes(topic)
            ? state.dislikedTopics
            : [...state.dislikedTopics, topic],
        })),

      likedInternshipIds: [],
      dislikedInternshipIds: [],
      addLikedId: (id) =>
        set((state) => ({
          likedInternshipIds: state.likedInternshipIds.includes(id)
            ? state.likedInternshipIds
            : [...state.likedInternshipIds, id],
        })),
      addDislikedId: (id) =>
        set((state) => ({
          dislikedInternshipIds: state.dislikedInternshipIds.includes(id)
            ? state.dislikedInternshipIds
            : [...state.dislikedInternshipIds, id],
        })),
    }),
    {
      name: "internmatch-store",
      partialize: (state) => ({
        user: state.user,
        activeResumeId: state.activeResumeId,
        savedInternships: state.savedInternships,
        filters: state.filters,
        darkMode: state.darkMode,
        resumeSkills: state.resumeSkills,
        resumeDomains: state.resumeDomains,
        resumeTechnologies: state.resumeTechnologies,
        dislikedTopics: state.dislikedTopics,
        likedInternshipIds: state.likedInternshipIds,
        dislikedInternshipIds: state.dislikedInternshipIds,
      }),
    }
  )
);
