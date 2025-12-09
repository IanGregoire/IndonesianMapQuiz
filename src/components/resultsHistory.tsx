'use client';

import { useEffect, useState } from 'react';
import { loadQuizResults } from 'utils/localStorage';
import { QuizResult } from 'utils/localStorage';

export default function ResultsHistory() {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    if(typeof window !== 'undefined') {
      setResults(loadQuizResults());
    }
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Past Results</h2>
      <ul className="space-y-2">
        {results.map((r, i) => (
          <li key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <div><strong>Island:</strong> {r.island}</div>
            <div><strong>Score:</strong> {r.correct} / {r.total}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
