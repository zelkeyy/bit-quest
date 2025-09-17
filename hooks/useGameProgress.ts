
import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Difficulty, type Progress } from '../types';

const STORAGE_KEY = 'quizChallengerProgress';

const getInitialProgress = (): Progress => {
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (item) {
      const parsed = JSON.parse(item);
      // Basic validation to ensure data structure is correct
      if (parsed.unlockedLevels && parsed.highScores) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading progress from localStorage", error);
  }
  return {
    unlockedLevels: [Difficulty.Easy],
    highScores: {},
  };
};

export const useGameProgress = () => {
  const [progress, setProgress] = useState<Progress>(getInitialProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress to localStorage", error);
    }
  }, [progress]);

  const unlockLevel = useCallback((difficulty: Difficulty) => {
    setProgress(prev => {
      if (prev.unlockedLevels.includes(difficulty)) {
        return prev;
      }
      return {
        ...prev,
        unlockedLevels: [...prev.unlockedLevels, difficulty],
      };
    });
  }, []);

  const updateHighScore = useCallback((difficulty: Difficulty, score: number) => {
    setProgress(prev => {
      const currentHighScore = prev.highScores[difficulty] || 0;
      if (score > currentHighScore) {
        return {
          ...prev,
          highScores: {
            ...prev.highScores,
            [difficulty]: score,
          },
        };
      }
      return prev;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const initialProgress = {
      unlockedLevels: [Difficulty.Easy],
      highScores: {},
    };
    setProgress(initialProgress);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
    } catch (error)
    {
      console.error("Error resetting progress in localStorage", error);
    }
  }, []);

  return { progress, unlockLevel, updateHighScore, resetProgress };
};
