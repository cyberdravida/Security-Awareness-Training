import { useState, useEffect, useCallback } from "react";

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  phishingResults: Record<string, boolean>;
  incidentResults: Record<string, string>;
  badges: string[];
  points: number;
}

const STORAGE_KEY = "cyber-training-progress";

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  phishingResults: {},
  incidentResults: {},
  badges: [],
  points: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        points: prev.points + 50,
      };
    });
  }, []);

  const saveQuizScore = useCallback((lessonId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [lessonId]: Math.max(score, prev.quizScores[lessonId] || 0) },
      points: prev.points + score * 10,
    }));
  }, []);

  const savePhishingResult = useCallback((emailId: string, correct: boolean) => {
    setProgress((prev) => ({
      ...prev,
      phishingResults: { ...prev.phishingResults, [emailId]: correct },
      points: prev.points + (correct ? 25 : 0),
    }));
  }, []);

  const saveIncidentResult = useCallback((scenarioId: string, stepId: string) => {
    setProgress((prev) => ({
      ...prev,
      incidentResults: { ...prev.incidentResults, [scenarioId]: stepId },
      points: prev.points + 30,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const totalLessons = 5;
  const completionPercent = Math.round((progress.completedLessons.length / totalLessons) * 100);

  return {
    progress,
    completeLesson,
    saveQuizScore,
    savePhishingResult,
    saveIncidentResult,
    resetProgress,
    completionPercent,
    totalLessons,
  };
}
