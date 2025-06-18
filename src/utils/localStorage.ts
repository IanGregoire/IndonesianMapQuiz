// eslint-disable-next-line
export function saveProgress(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadProgress<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export interface QuizResult {
  island: string | null;
  correct: number;
  total: number;
}

export function saveQuizResult(result: QuizResult) {
  const key = 'quiz-results';
  const existing = localStorage.getItem(key);
  const results = existing ? JSON.parse(existing) : [];
  results.push(result);
  localStorage.setItem(key, JSON.stringify(results));
}

export function loadQuizResults(): QuizResult[] {
  const data = localStorage.getItem('quiz-results');
  return data ? JSON.parse(data) : [];
}
