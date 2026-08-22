import { useState, useEffect } from 'react';

// Same mechanism as kurdish-tech.github.io's useTheme (class-based dark
// mode + localStorage persistence), but Kurdle's default is dark even on
// a first visit with no OS preference signal -- a deliberate brand choice
// for this project, unlike Ferheng which follows the OS.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('kurdle-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('kurdle-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
