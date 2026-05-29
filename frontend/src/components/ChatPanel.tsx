"use client";

import React, { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "./MaterialIcon";
import { useAppStore } from "@/lib/store";
import { sendChatMessage } from "@/lib/api";
import { ChatMessage, ChatSession } from "@/types";

const MOCK_SESSIONS: ChatSession[] = [
  {
    id: "session-1",
    title: "Remote AI roles",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Show me remote AI internships.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "m2",
        role: "assistant",
        content: "I found remote AI listings in the current demo catalog and ranked OpenAI, Databricks, and Netflix highest.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        confidence: 0.92,
      },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hello. I can help you explore internships, explain roles, and capture your preferences, but the current backend is still a deterministic demo rather than a real agentic assistant.",
  timestamp: new Date().toISOString(),
};

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const { setActiveChatSession } = useAppStore();
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!activeSession) {
      const newSession: ChatSession = {
        id: `session-${Date.now()}`,
        title: "New Chat",
        messages: [INITIAL_MESSAGE],
        createdAt: new Date().toISOString(),
      };
      setActiveSession(newSession);
      setSessions((prev) => [newSession, ...prev]);
    }
  }, [activeSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSession?.id]);

  const handleSend = async () => {
    if (!input.trim() || !activeSession || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedSession = {
      ...activeSession,
      messages: [...activeSession.messages, userMessage],
    };
    setActiveSession(updatedSession);
    setInput("");
    setLoading(true);

    try {
      const result = await sendChatMessage(activeSession.id, userMessage.content);
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, result.message],
        title:
          updatedSession.messages.length <= 2
            ? userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? "..." : "")
            : updatedSession.title,
      };

      setActiveSession(finalSession);
      setSessions((prev) => prev.map((session) => (session.id === finalSession.id ? finalSession : session)));
    } finally {
      setLoading(false);
    }
  };

  const switchSession = (session: ChatSession) => {
    setActiveSession(session);
    setActiveChatSession(session.id);
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: "New Chat",
      messages: [INITIAL_MESSAGE],
      createdAt: new Date().toISOString(),
    };
    setActiveSession(newSession);
    setSessions((prev) => [newSession, ...prev]);
    setActiveChatSession(newSession.id);
  };

  return (
    <div className="fixed bottom-16 right-6 z-50 w-[380px] h-[520px] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
      <div className="bg-primary p-4 text-on-primary flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <MaterialIcon icon="support_agent" />
          <span className="font-headline-sm text-headline-sm">Career Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={createNewSession} className="p-1 rounded-full hover:bg-white/20 transition-colors" title="New chat">
            <MaterialIcon icon="add" size={20} />
          </button>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <MaterialIcon icon="close" size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 bg-surface-container-low border-r border-outline-variant flex flex-col items-center py-4 gap-3 overflow-y-auto no-scrollbar flex-shrink-0">
          <button
            onClick={createNewSession}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm font-bold hover:bg-surface-tint transition-colors"
            title="New Chat"
          >
            <MaterialIcon icon="add" size={18} />
          </button>
          {sessions.map((session, index) => (
            <button
              key={session.id}
              onClick={() => switchSession(session)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-label-sm font-bold border transition-colors ${
                session.id === activeSession?.id
                  ? "bg-secondary-container text-on-secondary-container border-outline-variant"
                  : "bg-surface-container-high text-outline border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container"
              }`}
              title={session.title}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {activeSession?.messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-xl ${
                    message.role === "user"
                      ? "bg-primary text-on-primary rounded-tr-none"
                      : "bg-surface-container-high text-on-surface rounded-tl-none"
                  }`}
                >
                  <p className="text-body-md whitespace-pre-wrap">{message.content}</p>
                  {message.confidence && message.role === "assistant" && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${message.confidence * 100}%` }} />
                      </div>
                      <span className="text-label-sm text-outline">{Math.round(message.confidence * 100)}% confidence</span>
                    </div>
                  )}
                  <span className="text-label-sm text-outline/70 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-container-high p-3 rounded-xl rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-outline-variant flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-primary text-on-primary h-10 w-10 rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors disabled:opacity-50"
            >
              <MaterialIcon icon="send" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
