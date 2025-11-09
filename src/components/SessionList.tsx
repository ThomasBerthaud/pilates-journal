import { useEffect, useState } from 'react';
import { calculateTotalDuration, formatDuration } from '../utils/calculations';
import { getPresetSessions } from '../utils/presets';
import { deleteSession, getAllSessions, isPresetSession } from '../utils/storage';
import type { Session } from '../utils/types';

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
          const isPreset = isPresetSession(session.id);
          return (
            <div
              key={session.id}
              className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border transform hover:scale-105 animate-fade-in ${
                isPreset
                  ? 'bg-linear-to-br from-purple-50 to-indigo-50 border-purple-200'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isPreset && (
                  <span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">
                    Prédéfinie
                  </span>
                )}
              </div>
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
                {!isPreset && (
                  <>
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
                  </>
                )}
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
