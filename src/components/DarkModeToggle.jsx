import React, { useEffect, useState } from 'react';

const storageKey = 'theme';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDarkMode = root.classList.contains('theme-dark');
    setIsDark(isDarkMode);
    setIsInitialized(true);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.toggle('theme-dark', next);
    try {
      localStorage.setItem(storageKey, next ? 'dark' : 'light');
    } catch (e) {}
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <button 
      className="theme-toggle" 
      aria-label="Toggle dark mode" 
      onClick={toggle} 
      title={isDark ? 'Wyłącz tryb ciemny' : 'Włącz tryb ciemny'}
      aria-pressed={isDark}
    >
      <span className="theme-toggle__track">
        <span className={`theme-toggle__thumb ${isDark ? 'theme-toggle__thumb--dark' : ''}`}>
          <span className="theme-toggle__icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </span>
      </span>
    </button>
  );
};

export default DarkModeToggle;