// import { create } from 'zustand';

// interface QuizState {
//   currentQuestion: number;
//   score: number;
//   guessedProvinces: string[];
//   addGuess: (province: string) => void;
//   reset: () => void;
// }

// export const useQuizStore = create<QuizState>((set) => ({
//   currentQuestion: 0,
//   score: 0,
//   guessedProvinces: [],
//   addGuess: (province) =>
//     set((state) => ({
//       guessedProvinces: [...state.guessedProvinces, province],
//       score: state.score + 1,
//     })),
//   reset: () => set({ currentQuestion: 0, score: 0, guessedProvinces: [] }),
// }));

// src/store/quizStore.ts
import { create } from 'zustand'

interface QuizState {
  island: string | null
  provinces: string[]
  targetProvince: string | null
  score: number
  total: number
  setIsland: (island: string) => void
  setProvinces: (provinces: string[]) => void
  setTargetProvince: (province: string) => void
  incrementScore: () => void
  incrementTotal: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  island: null,
  provinces: [],
  targetProvince: null,
  score: 0,
  total: 0,
  setIsland: (island) => set({ island }),
  setProvinces: (provinces) => set({ provinces }),
  setTargetProvince: (province) => set({ targetProvince: province }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  incrementTotal: () => set((state) => ({ total: state.total + 1 })),
  reset: () =>
    set({
      island: null,
      provinces: [],
      targetProvince: null,
      score: 0,
      total: 0,
    }),
}))
