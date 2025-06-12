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
  kabupaten: string[]
  provinces: string[]
  targetProvince: string | null
  targetKabupaten: string | null
  score: number
  total: number
  setIsland: (island: string) => void
  setProvinces: (provinces: string[]) => void
  setTargetProvince: (provinces: string) => void
  setKabupaten: (kabupaten: string[]) => void
  setTargetKabupaten: (kabupaten: string) => void
  incrementScore: () => void
  incrementTotal: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  island: null,
  provinces: [],
  kabupaten: [],
  targetProvince: null,
  targetKabupaten: null,
  score: 0,
  total: 0,
  setIsland: (island) => set({ island }),
  setProvinces: (provinces) => set({ provinces }),
  setTargetProvince: (province) => set({ targetProvince: province }),
  setKabupaten: (kabupaten) => set({ kabupaten }),
  setTargetKabupaten: (kabupaten) => set({ targetKabupaten: kabupaten }),
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
