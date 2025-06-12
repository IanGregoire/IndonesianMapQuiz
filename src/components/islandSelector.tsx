'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useQuizStore } from 'store/useQuizStore'

const islands = [
  { id: 'Sumatra', label: 'Sumatra' },
  { id: 'Java', label: 'Java' },
  { id: 'Kalimantan', label: 'Kalimantan' },
  { id: 'Sulawesi', label: 'Sulawesi' },
  { id: 'Nusa', label: 'Bali & Nusa Tenggara' },
  { id: 'Maluku', label: 'Maluku' },
  { id: 'West_Papua', label: 'West Papua' },
]

export default function IslandSelector() {
  const router = useRouter()
  const setIsland = useQuizStore((state) => state.setIsland)
  const reset = useQuizStore((state) => state.reset)

  const handleSelect = (islandId: string) => {
    reset()
    setIsland(islandId)
    router.push('/quiz')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl mb-6">Select an Island</h1>
      <div className="grid grid-cols-2 gap-4">
        {islands.map((island) => (
          <Link
            key={island.id}
            href={`/quiz/${island.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {island.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
