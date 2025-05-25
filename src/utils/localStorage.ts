export function saveProgress(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadProgress<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
