import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <p>Welcome to the Indonesian Province Quiz!</p>
      <p>Select a quiz to get started:</p>

      <Link
        href="/quiz"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Start Quiz
      </Link>
    </div>
  )
}