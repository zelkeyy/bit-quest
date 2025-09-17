import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { LevelSelectScreen } from './components/LevelSelectScreen';
import { QuizScreen } from './components/QuizScreen';
import { ScoreScreen } from './components/ScoreScreen';
import { InstructionsModal } from './components/InstructionsModal';
import { useGameProgress } from './hooks/useGameProgress';
import { QUIZ_DATA } from './data/quizData';
import { Difficulty, type View } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [lastScore, setLastScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const { progress, unlockLevel, updateHighScore, resetProgress } = useGameProgress();

  const handleStartGame = () => {
    // Start with the easiest unlocked level that is not yet perfected
    const firstUnplayed = Object.values(Difficulty).find(d => progress.unlockedLevels.includes(d) && (progress.highScores[d] || 0) < 100);
    setCurrentDifficulty(firstUnplayed || Difficulty.Easy);
    setView('quiz');
  };

  const handleSelectLevel = () => setView('level-select');

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setCurrentDifficulty(difficulty);
    setView('quiz');
  };

  const handleQuizComplete = useCallback((score: number) => {
    setLastScore(score);
    updateHighScore(currentDifficulty, score);

    const levelData = QUIZ_DATA.find(l => l.difficulty === currentDifficulty);
    if (score >= (levelData?.unlockThreshold || 70)) {
      const currentIndex = QUIZ_DATA.findIndex(l => l.difficulty === currentDifficulty);
      if (currentIndex < QUIZ_DATA.length - 1) {
        const nextLevel = QUIZ_DATA[currentIndex + 1];
        unlockLevel(nextLevel.difficulty);
      }
    }
    setView('score');
  }, [currentDifficulty, updateHighScore, unlockLevel]);

  const handleResetProgress = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset semua progress? Aksi ini tidak bisa dibatalkan.")) {
      resetProgress();
      setView('home');
    }
  };

  const currentLevelData = useMemo(() => {
    return QUIZ_DATA.find(level => level.difficulty === currentDifficulty);
  }, [currentDifficulty]);

  const renderView = () => {
    switch (view) {
      case 'quiz':
        return currentLevelData ? (
          <QuizScreen questions={currentLevelData.questions} onQuizComplete={handleQuizComplete} />
        ) : (
          <div>Level not found.</div>
        );
      case 'score':
        return currentLevelData ? (
          <ScoreScreen
            score={lastScore}
            difficulty={currentDifficulty}
            unlockThreshold={currentLevelData.unlockThreshold}
            onPlayAgain={() => handleSelectDifficulty(currentDifficulty)}
            onBackToLevels={() => setView('level-select')}
          />
        ) : null;
      case 'level-select':
        return (
          <LevelSelectScreen
            progress={progress}
            onSelectDifficulty={handleSelectDifficulty}
            onBack={() => setView('home')}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onSelectLevel={handleSelectLevel}
            onShowInstructions={() => setShowInstructions(true)}
            onResetProgress={handleResetProgress}
          />
        );
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full h-[95vh] max-w-6xl mx-auto bg-white/60 rounded-2xl shadow-lg border border-stone-200 backdrop-blur-md">
        {renderView()}
      </div>
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
    </main>
  );
}