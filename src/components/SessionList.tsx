import { PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { getPresetSessions } from '../utils/presets';
import { deleteSession, getAllSessions, isPresetSession } from '../utils/storage';
import type { Session } from '../utils/types';
import SessionPreview from './SessionPreview';
import EmptySessionsView from './views/sessions/EmptySessionsView';
import SessionCard from './views/sessions/SessionCard';
import SessionsHeader from './views/sessions/SessionsHeader';

interface SessionListProps {
  onEdit: (session: Session) => void;
  onStart: (session: Session) => void;
  onCreateNew: () => void;
}

export default function SessionList({ onEdit, onStart, onCreateNew }: SessionListProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [previewSession, setPreviewSession] = useState<Session | null>(null);

  const loadSessions = () => {
    const userSessions = getAllSessions();
    const presetSessions = getPresetSessions();
    // Combine presets first, then user sessions
    setSessions([...presetSessions, ...userSessions]);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleDelete = (id: string) => {
    // Don't allow deleting preset sessions
    if (isPresetSession(id)) {
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      deleteSession(id);
      loadSessions();
    }
  };

  if (sessions.length === 0) {
    return <EmptySessionsView onCreateNew={onCreateNew} />;
  }

  return (
    <div className="space-y-4 pb-20 md:pb-4">
      <SessionsHeader onCreateNew={onCreateNew} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onEdit={onEdit}
            onStart={onStart}
            onPreview={setPreviewSession}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {previewSession && (
        <SessionPreview
          session={previewSession}
          onStart={() => {
            onStart(previewSession);
            setPreviewSession(null);
          }}
          onClose={() => setPreviewSession(null)}
        />
      )}
      {/* Bouton flottant pour mobile */}
      <button
        onClick={onCreateNew}
        className="fixed bottom-6 right-6 md:hidden z-40 w-14 h-14 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-2xl hover:shadow-2xl flex items-center justify-center"
        aria-label="Nouvelle séance"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
