"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAppStore } from "@/lib/store";
import { uploadResume } from "@/lib/api";

export default function WelcomePage() {
  const router = useRouter();
  const { setUser, setActiveResumeId, setResumeProfile } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF or DOCX file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be under 5MB.");
        return;
      }

      setUploading(true);
      setError(null);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 15, 85));
      }, 200);

      try {
        const result = await uploadResume(file);
        clearInterval(progressInterval);
        setUploadProgress(100);

        const parsed = result.parsed_data;
        const skills = parsed?.skills || ["React", "TypeScript", "Figma"];
        const domains = parsed?.preferredDomains || parsed?.preferred_domains || ["Frontend Engineering"];
        const technologies = parsed?.technologies || ["React", "Next.js"];

        setResumeProfile(skills, domains, technologies);

        setUser({
          id: "user-1",
          name: "User",
          email: "user@example.com",
          resumes: [
            {
              id: result.resume_id,
              filename: file.name,
              fileUrl: "#",
              parsedData: parsed,
              uploadedAt: new Date().toISOString(),
              modifiedAt: new Date().toISOString(),
            },
          ],
          activeResumeId: result.resume_id,
          preferences: {
            likedInternships: [],
            dislikedInternships: [],
            excludedTopics: [],
            preferredDomains: domains,
            preferredLocations: [],
            salaryExpectation: null,
            workMode: ["remote", "hybrid"],
            experienceLevel: "entry",
            maxApplicants: 50,
            requireResume: true,
            requireLinkedIn: false,
            requireGitHub: false,
          },
          createdAt: new Date().toISOString(),
        });
        setActiveResumeId(result.resume_id);

        setTimeout(() => {
          router.push("/discovery");
        }, 800);
      } catch (err) {
        clearInterval(progressInterval);
        setUploading(false);
        setError("Upload failed. Please try again.");
        console.error(err);
      }
    },
    [router, setUser, setActiveResumeId, setResumeProfile]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 5 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="min-h-screen flex flex-col" {...getRootProps()}>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-topbar h-16 flex justify-between items-center px-margin-mobile">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
            <MaterialIcon icon="avatar" className="text-on-primary-container" size={20} />
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary">InternMatch</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile pt-16 pb-24">
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-stack-lg">
          <div className="relative w-48 h-48 mb-stack-md flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png"
              alt="Professional Resume Icon"
              className="relative z-10 w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          <div className="space-y-stack-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Ready to start your search?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant px-2 leading-relaxed">
              Upload your resume to see handpicked internship opportunities matching your profile.
            </p>
          </div>

          <div className="w-full pt-stack-md space-y-stack-md">
            {error && (
              <div className="bg-error-container text-on-error-container px-4 py-2 rounded-lg text-body-md">
                {error}
              </div>
            )}

            <button
              onClick={open}
              disabled={uploading}
              className="group relative w-full h-14 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-center gap-2 relative z-10">
                {uploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Uploading... {uploadProgress}%</span>
                  </>
                ) : (
                  <>
                    <MaterialIcon icon="upload" />
                    <span>Upload Resume</span>
                  </>
                )}
              </div>
              {uploading && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              )}
            </button>

            <input {...getInputProps()} />

            <p className="font-label-md text-label-md text-outline">Supported formats: PDF, DOCX (Max 5MB)</p>

            {isDragActive && (
              <div className="absolute inset-0 bg-primary/10 border-4 border-primary border-dashed rounded-xl flex items-center justify-center z-50">
                <p className="text-headline-md font-headline-md text-primary">Drop your resume here</p>
              </div>
            )}
          </div>

          <div className="gap-stack-md w-full mt-stack-lg flex justify-center">
            <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant text-left max-w-[200px]">
              <MaterialIcon icon="auto_awesome" className="text-secondary mb-2" />
              <h3 className="font-label-md text-label-md text-on-surface">Smart Matching</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">AI-driven role suggestions</p>
            </div>
            <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant text-left max-w-[200px]">
              <MaterialIcon icon="chat" className="text-secondary mb-2" />
              <h3 className="font-label-md text-label-md text-on-surface">AI Assistant</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Conversational job search</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
