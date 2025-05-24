import { create } from 'zustand';

interface QuizState {
  currentQuestion: number;
  score: number;
  guessedProvinces: string[];
  addGuess: (province: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  score: 0,
  guessedProvinces: [],
  addGuess: (province) =>
    set((state) => ({
      guessedProvinces: [...state.guessedProvinces, province],
      score: state.score + 1,
    })),
  reset: () => set({ currentQuestion: 0, score: 0, guessedProvinces: [] }),
}));
