// src/components/QuizControls.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useQuizStore } from 'store/useQuizStore'

export default function QuizControls() {
  const router = useRouter()
  const score = useQuizStore((state) => state.score)
  const total = useQuizStore((state) => state.total)

  const finishQuiz = () => {
    router.push('/result')
  }

  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="text-lg">
        Score: {score} / {total}
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={finishQuiz}
      >
        Finish Quiz
      </button>
    </div>
  )
}
