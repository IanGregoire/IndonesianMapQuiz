'use client'

import { useRouter } from 'next/navigation'
import { useQuizStore } from 'store/useQuizStore'

export default function ResultSummary() {
  const router = useRouter()
  const score = useQuizStore((state) => state.score)
  const total = useQuizStore((state) => state.total)
  const reset = useQuizStore((state) => state.reset)

  const handlePlayAgain = () => {
    reset()
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl mb-4">Quiz Complete!</h1>
      <p className="text-xl mb-6">
        Your Score: {score} / {total}
      </p>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        onClick={handlePlayAgain}
      >
        Play Again
      </button>
    </div>
  )
}
