import { useState } from 'react';
import { calculateTotalDuration, formatDuration } from '../utils/calculations';
import { getPresetSessions } from '../utils/presets';
import { createSession } from '../utils/storage';
import type { Session } from '../utils/types';
import SessionPreview from './SessionPreview';

interface PresetSessionsProps {
  onImport: () => void;
}

export default function PresetSessions({ onImport }: PresetSessionsProps) {
  const presets = getPresetSessions();
  const [previewSession, setPreviewSession] = useState<Session | null>(null);

  const handleImport = (preset: Session) => {
    // Create a new session from the preset
    createSession(preset.name, preset.exercises);
    onImport();
  };

  if (presets.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Séances pré-définies</h2>
      <p className="text-gray-600 mb-4">
        Importez une séance pré-définie pour commencer rapidement
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => {
          const totalDuration = calculateTotalDuration(preset);
          return (
            <div
              key={preset.id}
              className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-purple-200 transform hover:scale-105 animate-slide-up"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">
                  Pré-défini
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{preset.name}</h3>
              <div className="text-sm text-gray-600 mb-4 space-y-1">
                <p>
                  {preset.exercises.length} exercice{preset.exercises.length > 1 ? 's' : ''}
                </p>
                <p>Durée totale : {formatDuration(totalDuration)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewSession(preset)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Voir
                </button>
                <button
                  onClick={() => handleImport(preset)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Importer
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
            // Import the session first, then start it
            const importedSession = createSession(previewSession.name, previewSession.exercises);
            onImport();
            // Navigate to the session page
            window.location.href = `/session/${importedSession.id}`;
          }}
          onClose={() => setPreviewSession(null)}
        />
      )}
    </div>
  );
}
