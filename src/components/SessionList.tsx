import { useState, useEffect } from 'react';
import { getAllSessions, deleteSession } from '../utils/storage';
import type { Session } from '../utils/types';
import { formatDuration, calculateTotalDuration } from '../utils/calculations';

import SessionPreview from './SessionPreview';

interface SessionListProps {
  onEdit: (session: Session) => void;
  onStart: (session: Session) => void;
  onCreateNew: () => void;
}

export default function SessionList({ onEdit, onStart, onCreateNew }: SessionListProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [previewSession, setPreviewSession] = useState<Session | null>(null);

  const loadSessions = () => {
    setSessions(getAllSessions());
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      deleteSession(id);
      loadSessions();
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Aucune séance créée pour le moment.</p>
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Créer ma première séance
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mes séances</h2>
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
        >
          + Nouvelle séance
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => {
          const totalDuration = calculateTotalDuration(session);
          return (
            <div
              key={session.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:scale-105 animate-fade-in"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{session.name}</h3>
              <div className="text-sm text-gray-600 mb-4 space-y-1">
                <p>
                  {session.exercises.length} exercice{session.exercises.length > 1 ? 's' : ''}
                </p>
                <p>Durée totale : {formatDuration(totalDuration)}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setPreviewSession(session)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Voir
                </button>
                <button
                  onClick={() => onStart(session)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Démarrer
                </button>
                <button
                  onClick={() => onEdit(session)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
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
