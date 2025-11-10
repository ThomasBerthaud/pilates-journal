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
    <div className="space-y-4">
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
    </div>
  );
}
