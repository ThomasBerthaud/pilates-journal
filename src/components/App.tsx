import { useState } from 'react';
import { isPresetSession } from '../utils/storage';
import type { Session } from '../utils/types';
import SessionForm from './SessionForm';
import SessionList from './SessionList';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingSessionId(null);
    setShowForm(true);
  };

  const handleEdit = (session: Session) => {
    // Don't allow editing preset sessions
    if (isPresetSession(session.id)) {
      return;
    }
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

  return (
    <>
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
