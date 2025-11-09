import { getPresetSessions } from './presets';
import type { HistoryEntry, Session } from './types';

const SESSIONS_KEY = 'pilates_sessions';
const HISTORY_KEY = 'pilates_history';

// Sessions management
export function getAllSessions(): Session[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getSessionById(id: string): Session | null {
  // First check preset sessions
  const presets = getPresetSessions();
  const preset = presets.find((s) => s.id === id);
  if (preset) return preset;

  // Then check user sessions
  const sessions = getAllSessions();
  return sessions.find((s) => s.id === id) || null;
}

export function isPresetSession(id: string): boolean {
  return id.startsWith('preset-');
}

export function saveSession(session: Session): void {
  if (typeof window === 'undefined') return;
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === session.id);

  if (index >= 0) {
    sessions[index] = { ...session, updatedAt: Date.now() };
  } else {
    sessions.push(session);
  }

  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function deleteSession(id: string): void {
  if (typeof window === 'undefined') return;
  const sessions = getAllSessions().filter((s) => s.id !== id);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function createSession(name: string, exercises: Session['exercises']): Session {
  const session: Session = {
    id: crypto.randomUUID(),
    name,
    exercises,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  saveSession(session);
  return session;
}

// History management
export function getAllHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

export function addHistoryEntry(entry: Omit<HistoryEntry, 'id'>): HistoryEntry {
  if (typeof window === 'undefined') {
    return { ...entry, id: '' };
  }

  const history = getAllHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
  };

  history.unshift(newEntry); // Add to beginning
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === 'undefined') return;
  const history = getAllHistory().filter((h) => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}
