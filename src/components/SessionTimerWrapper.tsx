import { useState, useEffect } from 'react';
import { getSessionById } from '../utils/storage';
import SessionTimer from './SessionTimer';
import type { Session } from '../utils/types';

interface SessionTimerWrapperProps {
  sessionId: string;
}

export default function SessionTimerWrapper({ sessionId }: SessionTimerWrapperProps) {
  const [session, setSession] = useState<Session | null>(() => getSessionById(sessionId));
  const [loading] = useState(false);

  useEffect(() => {
    const currentSession = getSessionById(sessionId);
    setSession(currentSession);
  }, [sessionId]);

  const handleComplete = () => {
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Chargement de la séance...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Séance introuvable</p>
        <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
          Retour à l&apos;accueil
        </a>
      </div>
    );
  }

  return <SessionTimer session={session} onComplete={handleComplete} />;
}
