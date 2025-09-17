import React from 'react';
import { Button } from './Button';
import { LockIcon, UnlockIcon } from './Icons';
import { Difficulty } from '../types';
import type { Progress } from '../types';

interface LevelSelectScreenProps {
  progress: Progress;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const levelStyles: { [key in Difficulty]: { bg: string, text: string, ring: string } } = {
  [Difficulty.Easy]: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-300' },
  [Difficulty.Medium]: { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-300' },
  [Difficulty.Hard]: { bg: 'bg-rose-100', text: 'text-rose-700', ring: 'ring-rose-300' },
};

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ progress, onSelectDifficulty, onBack }) => {
  const levels = Object.values(Difficulty);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 animate-fade-in">
      <h2 className="text-4xl font-bold mb-8 text-violet-600">Pilih Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {levels.map(level => {
          const isUnlocked = progress.unlockedLevels.includes(level);
          const highScore = progress.highScores[level] || 0;
          const style = levelStyles[level];

          return (
            <button
              key={level}
              disabled={!isUnlocked}
              onClick={() => onSelectDifficulty(level)}
              className={`relative p-6 rounded-xl text-left transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed ${style.bg} hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 ${style.ring}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-2xl font-bold ${style.text}`}>{level}</h3>
                {isUnlocked ? <UnlockIcon className="w-6 h-6 text-emerald-500" /> : <LockIcon className="w-6 h-6 text-stone-400" />}
              </div>
              <p className="text-stone-600">Skor Tertinggi: {highScore}%</p>
              {!isUnlocked && <div className="absolute inset-0 bg-white/70 rounded-xl backdrop-blur-sm"></div>}
            </button>
          );
        })}
      </div>
      <div className="mt-12">
        <Button onClick={onBack} variant="secondary">Kembali</Button>
      </div>
    </div>
  );
};