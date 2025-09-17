import React from 'react';
import { Button } from './Button';
import { Difficulty } from '../types';

interface ScoreScreenProps {
  score: number;
  difficulty: Difficulty;
  unlockThreshold: number;
  onPlayAgain: () => void;
  onBackToLevels: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, difficulty, unlockThreshold, onPlayAgain, onBackToLevels }) => {
  const passed = score >= unlockThreshold;
  const message = passed
    ? "Selamat! Anda berhasil membuka level berikutnya!"
    : "Jangan menyerah! Ulangi untuk membuka level berikutnya.";
  
  const scoreColor = passed ? 'text-emerald-500' : 'text-rose-500';

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up">
        <h2 className="text-3xl font-bold text-violet-600 mb-2">Level {difficulty} Selesai!</h2>
        <p className="text-stone-500 mb-6">Skor Akhir Anda:</p>
        <p className={`text-7xl font-bold mb-6 ${scoreColor}`}>{score}%</p>
        <p className="text-lg text-slate-600 mb-8">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onPlayAgain} variant="secondary">Main Lagi</Button>
          <Button onClick={onBackToLevels}>Kembali ke Level</Button>
        </div>
      </div>
    </div>
  );
};