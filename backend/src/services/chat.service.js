const { getState } = require("./state.service");
const { createId } = require("../utils/id");

function generateReply(message) {
  const query = message.toLowerCase();

  if (query.includes("remote")) {
    return "Remote matches currently include OpenAI, Airbnb, and selected frontend roles from the mock catalog.";
  }

  if (query.includes("salary") || query.includes("paid")) {
    return "The strongest paid matches in the current dataset are OpenAI, Vercel, and Netflix.";
  }

  if (query.includes("claude") || query.includes("exclude")) {
    return "Preference memory would exclude Claude-related roles, but the backend still stores that in-memory only.";
  }

  return "The backend is currently returning deterministic demo guidance rather than a real RAG answer.";
}

function sendMessage(sessionId, message) {
  const state = getState();
  let session = state.chatSessions.find((item) => item.id === sessionId);

  if (!session) {
    session = {
      id: createId("session"),
      title: message.slice(0, 30),
      messages: [],
      createdAt: new Date().toISOString(),
    };
    state.chatSessions.unshift(session);
  }

  session.messages.push({
    id: createId("message"),
    role: "user",
    content: message,
    timestamp: new Date().toISOString(),
  });

  const reply = {
    id: createId("message"),
    role: "assistant",
    content: generateReply(message),
    timestamp: new Date().toISOString(),
    confidence: 0.72,
  };

  session.messages.push(reply);

  return {
    session_id: session.id,
    message: reply,
  };
}

function getSessions() {
  return { sessions: getState().chatSessions };
}

function getSession(sessionId) {
  return getState().chatSessions.find((item) => item.id === sessionId) || null;
}

module.exports = {
  sendMessage,
  getSessions,
  getSession,
};
