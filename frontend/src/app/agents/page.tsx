"use client";

import React, { useEffect, useState } from "react";
import { TopAppBar } from "@/components/TopAppBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MaterialIcon } from "@/components/MaterialIcon";
import { getAgentStatus, triggerAgentRun } from "@/lib/api";
import { AgentStatus } from "@/types";

function getStatusColor(status: string): string {
  switch (status) {
    case "running":
      return "bg-green-500";
    case "scheduled":
      return "bg-blue-500";
    case "idle":
      return "bg-gray-400";
    case "error":
      return "bg-error";
    default:
      return "bg-gray-400";
  }
}

function getStatusBadge(status: string): string {
  switch (status) {
    case "running":
      return "bg-green-100 text-green-700";
    case "scheduled":
      return "bg-blue-100 text-blue-700";
    case "idle":
      return "bg-gray-100 text-gray-600";
    case "error":
      return "bg-error-container text-on-error-container";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentStatus | null>(null);
  const [runningAgent, setRunningAgent] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getAgentStatus()
      .then((result) => {
        if (mounted) {
          setAgents(result.agents);
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  const handleTriggerRun = async (agentId: string) => {
    setRunningAgent(agentId);

    try {
      await triggerAgentRun(agentId);
      const result = await getAgentStatus();
      setAgents(result.agents);
    } catch {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === agentId
            ? { ...agent, status: "running", lastRun: new Date().toISOString() }
            : agent
        )
      );
    } finally {
      setTimeout(() => setRunningAgent(null), 1500);
    }
  };

  const totalJobs = agents.reduce((sum, agent) => sum + agent.jobsProcessed, 0);
  const totalErrors = agents.reduce((sum, agent) => sum + agent.errorCount, 0);
  const activeAgents = agents.filter((agent) => agent.status === "running").length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopAppBar />

      <main className="max-w-4xl mx-auto pt-24 px-margin-mobile">
        <header className="mb-6">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-stack-sm">Agent Monitor</h2>
          <p className="text-body-md text-on-surface-variant">
            Current backend agents are lightweight schedulers and mock refresh workers, not autonomous long-running AI systems.
          </p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <MaterialIcon icon="database" className="text-primary" size={20} />
              <span className="text-label-sm text-outline uppercase">Total Jobs</span>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-surface">{totalJobs}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <MaterialIcon icon="smart_toy" className="text-secondary" size={20} />
              <span className="text-label-sm text-outline uppercase">Active Agents</span>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-surface">{activeAgents}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <MaterialIcon icon="error" className="text-error" size={20} />
              <span className="text-label-sm text-outline uppercase">Errors</span>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-surface">{totalErrors}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div className="flex items-center gap-2 mb-2">
              <MaterialIcon icon="schedule" className="text-tertiary" size={20} />
              <span className="text-label-sm text-outline uppercase">Mode</span>
            </div>
            <p className="text-headline-sm font-headline-sm text-on-surface">Mock + In-Memory</p>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low">
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Backend Agents</h3>
          </div>
          <div className="divide-y divide-outline-variant">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} ${agent.status === "running" ? "animate-pulse" : ""}`} />
                    <div>
                      <h4 className="text-body-md font-semibold text-on-surface">{agent.name}</h4>
                      <p className="text-label-sm text-outline">
                        Last run: {agent.lastRun ? new Date(agent.lastRun).toLocaleTimeString() : "Never"}
                        {agent.nextRun ? ` · Next: ${new Date(agent.nextRun).toLocaleTimeString()}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-label-sm font-semibold capitalize ${getStatusBadge(agent.status)}`}>
                      {agent.status}
                    </span>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleTriggerRun(agent.id);
                      }}
                      disabled={runningAgent === agent.id}
                      className="p-2 rounded-full hover:bg-surface-container-high transition-colors disabled:opacity-50"
                      title="Trigger run"
                    >
                      <MaterialIcon
                        icon={runningAgent === agent.id ? "sync" : "play_arrow"}
                        className={runningAgent === agent.id ? "text-primary animate-spin" : "text-primary"}
                        size={20}
                      />
                    </button>
                    <MaterialIcon
                      icon={selectedAgent?.id === agent.id ? "expand_less" : "expand_more"}
                      className="text-outline"
                      size={20}
                    />
                  </div>
                </div>

                {selectedAgent?.id === agent.id && (
                  <div className="mt-4 pt-4 border-t border-outline-variant animate-slide-up">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-surface-container-high p-3 rounded-lg">
                        <p className="text-label-sm text-outline">Jobs Fetched</p>
                        <p className="text-headline-sm font-headline-sm text-on-surface">{agent.jobsFetched}</p>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded-lg">
                        <p className="text-label-sm text-outline">Processed</p>
                        <p className="text-headline-sm font-headline-sm text-on-surface">{agent.jobsProcessed}</p>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded-lg">
                        <p className="text-label-sm text-outline">Errors</p>
                        <p className="text-headline-sm font-headline-sm text-error">{agent.errorCount}</p>
                      </div>
                    </div>

                    <div className="bg-surface-container-high rounded-lg overflow-hidden">
                      <div className="p-2 border-b border-outline-variant bg-surface-container-low">
                        <span className="text-label-sm text-outline uppercase tracking-wider">Recent Logs</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto no-scrollbar">
                        {agent.logs.map((log, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 border-b border-outline-variant/30 last:border-0">
                            <span
                              className={`text-label-sm font-semibold uppercase ${
                                log.level === "error"
                                  ? "text-error"
                                  : log.level === "warn"
                                  ? "text-tertiary"
                                  : "text-secondary"
                              }`}
                            >
                              {log.level}
                            </span>
                            <span className="text-label-sm text-outline flex-shrink-0">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                            <span className="text-body-md text-on-surface">{log.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
