import React from 'react';
import { Button } from './Button';

interface HomeScreenProps {
  onStartGame: () => void;
  onSelectLevel: () => void;
  onShowInstructions: () => void;
  onResetProgress: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame, onSelectLevel, onShowInstructions, onResetProgress }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fade-in">
      <h1 className="text-6xl md:text-7xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">
        Bit Quest
      </h1>
      <p className="text-xl text-slate-500 mb-12">Coba Overclock otakmu disini!</p>
      <div className="space-y-4 w-full max-w-xs">
        <Button onClick={onStartGame} className="w-full text-lg">Mulai Game</Button>
        <Button onClick={onSelectLevel} variant="secondary" className="w-full text-lg">Pilih Level</Button>
        <Button onClick={onShowInstructions} variant="secondary" className="w-full text-lg">Petunjuk</Button>
        <Button onClick={onResetProgress} variant="ghost" className="w-full mt-4 !text-rose-500 hover:!bg-rose-100/50">Reset Progress</Button>
      </div>
    </div>
  );
};