import { useState } from 'react';
import SessionList from './SessionList';
import PresetSessions from './PresetSessions';
import SessionForm from './SessionForm';
import type { Session } from '../utils/types';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingSessionId(null);
    setShowForm(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSessionId(session.id);
    setShowForm(true);
  };

  const handleStart = (session: Session) => {
    window.location.href = `/session/${session.id}`;
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingSessionId(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSessionId(null);
  };

  const handlePresetImport = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <PresetSessions key={`presets-${refreshKey}`} onImport={handlePresetImport} />
      <SessionList
        key={`sessions-${refreshKey}`}
        onEdit={handleEdit}
        onStart={handleStart}
        onCreateNew={handleCreateNew}
      />
      {showForm && (
        <SessionForm
          sessionId={editingSessionId}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </>
  );
}
