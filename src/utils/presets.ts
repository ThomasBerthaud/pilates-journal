import advancedData from '../data/presets/advanced.json';
import beginnerData from '../data/presets/beginner.json';
import intermediateData from '../data/presets/intermediate.json';
import type { Exercise, Session } from './types';

// Fixed date for all preset sessions: November 8, 2025
const PRESET_DATE = new Date('2025-11-08').getTime();

export function getPresetSessions(): Session[] {
  const presets: Session[] = [
    {
      id: 'preset-beginner',
      name: beginnerData.name,
      exercises: beginnerData.exercises as Exercise[],
      createdAt: PRESET_DATE,
      updatedAt: PRESET_DATE,
    },
    {
      id: 'preset-intermediate',
      name: intermediateData.name,
      exercises: intermediateData.exercises as Exercise[],
      createdAt: PRESET_DATE,
      updatedAt: PRESET_DATE,
    },
    {
      id: 'preset-advanced',
      name: advancedData.name,
      exercises: advancedData.exercises as Exercise[],
      createdAt: PRESET_DATE,
      updatedAt: PRESET_DATE,
    },
  ];

  return presets;
}
