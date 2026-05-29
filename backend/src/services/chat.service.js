import { ChatHistory } from "../models/chatHistory.model.js";
import {
  createStateSession,
  getStateMessages,
  addStateSession,
} from "./state.service.js";
import { createId } from "../utils/id.js";

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

async function sendMessage(sessionId, message) {
  let session = getStateMessages(sessionId);

  if (!session) {
    session = createStateSession(sessionId, message.slice(0, 30));
    addStateSession(session);
  }

  const userMessage = {
    id: createId("message"),
    role: "user",
    content: message,
    timestamp: new Date().toISOString(),
  };
  session.messages.push(userMessage);

  await ChatHistory.create({
    id: userMessage.id,
    userId: sessionId,
    role: "user",
    message: message,
    timestamp: new Date(),
  });

  const replyContent = generateReply(message);
  const reply = {
    id: createId("message"),
    role: "assistant",
    content: replyContent,
    timestamp: new Date().toISOString(),
    confidence: 0.72,
  };
  session.messages.push(reply);

  await ChatHistory.create({
    id: reply.id,
    userId: sessionId,
    role: "assistant",
    message: replyContent,
    timestamp: new Date(),
  });

  return {
    session_id: session.id,
    message: reply,
  };
}

async function getSessions() {
  const histories = await ChatHistory.findAll({
    attributes: ["userId"],
    group: ["userId"],
  });
  return {
    sessions: histories.map((h) => ({ id: h.userId, title: "Chat Session" })),
  };
}

async function getSession(sessionId) {
  const history = await ChatHistory.findAll({
    where: { userId: sessionId },
    order: [["timestamp", "ASC"]],
  });
  if (!history || history.length === 0) return null;

  return {
    id: sessionId,
    title: "Chat",
    messages: history.map((item) => ({
      id: item.id,
      role: item.role,
      content: item.message,
      timestamp: item.timestamp,
    })),
  };
}

async function getChatHistoryByUser(userId) {
  const history = await ChatHistory.findAll({
    where: { userId },
    order: [["timestamp", "ASC"]],
  });
  return history.map((item) => item.get({ plain: true }));
}

export { sendMessage, getSessions, getSession, getChatHistoryByUser };
