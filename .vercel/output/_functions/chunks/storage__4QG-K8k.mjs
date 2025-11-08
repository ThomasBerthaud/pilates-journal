import { e as createComponent, f as createAstro, l as renderHead, n as renderSlot, r as renderTemplate } from './astro/server_DDLvSHup.mjs';
import 'clsx';
/* empty css                           */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Pilates Journal" } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="description" content="Application de gestion de séances de pilates"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><meta name="theme-color" content="#6366f1"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="bg-linear-to-br from-indigo-50 to-purple-50 min-h-screen"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/thomasberthaud/dev/pilate-journal/src/layouts/Layout.astro", void 0);

const SESSIONS_KEY = "pilates_sessions";
const HISTORY_KEY = "pilates_history";
function getAllSessions() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}
function getSessionById(id) {
  const sessions = getAllSessions();
  return sessions.find((s) => s.id === id) || null;
}
function saveSession(session) {
  if (typeof window === "undefined") return;
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = { ...session, updatedAt: Date.now() };
  } else {
    sessions.push(session);
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}
function deleteSession(id) {
  if (typeof window === "undefined") return;
  const sessions = getAllSessions().filter((s) => s.id !== id);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}
function createSession(name, exercises) {
  const session = {
    id: crypto.randomUUID(),
    name,
    exercises,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  saveSession(session);
  return session;
}
function getAllHistory() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}
function addHistoryEntry(entry) {
  if (typeof window === "undefined") {
    return { ...entry, id: "" };
  }
  const history = getAllHistory();
  const newEntry = {
    ...entry,
    id: crypto.randomUUID()
  };
  history.unshift(newEntry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}
function deleteHistoryEntry(id) {
  if (typeof window === "undefined") return;
  const history = getAllHistory().filter((h) => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

export { $$Layout as $, addHistoryEntry as a, getSessionById as b, clearHistory as c, deleteHistoryEntry as d, getAllSessions as e, deleteSession as f, getAllHistory as g, createSession as h, saveSession as s };
