import React from 'react';
import { useState, useMemo } from 'react';
import { Button } from './Button';
import { CheckIcon, XIcon } from './Icons';
import type { Question } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onQuizComplete: (score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const shuffledChoices = useMemo(() => {
    // A function to shuffle choices when a new question is displayed.
    // Here, we just return them as is, but you could implement shuffling.
    return currentQuestion.choices;
  }, [currentQuestion]);

  const handleAnswerSelect = (choice: string) => {
    if (isAnswered) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);
    if (choice === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      const finalScore = Math.round((score / questions.length) * 100);
      onQuizComplete(finalScore);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 w-full max-w-3xl mx-auto">
      <div className="w-full bg-white rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in-up">
        {/* Progress Bar and Counter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 text-stone-500">
            <p className="font-semibold">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
            <p className="font-bold text-violet-500">{Math.round((score / (currentQuestionIndex + 1) || 0) * 100)}%</p>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-rose-400 to-violet-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-slate-800 min-h-[100px]">{currentQuestion.question}</h2>

        {/* Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {shuffledChoices.map((choice, index) => {
            const isCorrect = choice === currentQuestion.answer;
            let buttonClass = 'bg-stone-100 hover:bg-stone-200 text-slate-700';
            if (isAnswered) {
              if (isCorrect) {
                buttonClass = 'bg-emerald-400 text-white ring-2 ring-emerald-300';
              } else if (selectedAnswer === choice) {
                buttonClass = 'bg-rose-400 text-white ring-2 ring-rose-300';
              } else {
                buttonClass = 'bg-stone-100 opacity-60 text-slate-700';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(choice)}
                disabled={isAnswered}
                className={`p-4 rounded-lg text-left transition-all duration-300 w-full disabled:cursor-not-allowed ${buttonClass}`}
              >
                <div className="flex items-center">
                  <span className="font-bold mr-4">{String.fromCharCode(65 + index)}</span>
                  <span className="flex-1">{choice}</span>
                  {isAnswered && (
                    isCorrect ? <CheckIcon className="w-6 h-6 text-white ml-2" /> :
                    selectedAnswer === choice && <XIcon className="w-6 h-6 text-white ml-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Next Button */}
        <div className="text-right">
          <Button onClick={handleNext} disabled={!isAnswered}>
            {currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Skor'}
          </Button>
        </div>
      </div>
    </div>
  );
};