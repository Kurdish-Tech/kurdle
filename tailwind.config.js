/** @type {import('tailwindcss').Config} */
// Color/font tokens intentionally mirror kurdish-tech.github.io's
// tailwind.config.js so Kurdle reads as the same brand, not a bolted-on
// side project.
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14171F',
          raised: '#1C2029',
          border: '#2A2F3B',
        },
        paper: {
          DEFAULT: '#EEF1F5',
          raised: '#FFFFFF',
          border: '#D8DEE6',
        },
        roj: {
          DEFAULT: '#E3A73C',
          soft: '#F0C979',
          deep: '#B5801F',
        },
        zagros: {
          DEFAULT: '#5C8A6E',
          soft: '#8FB39D',
          deep: '#3E6350',
        },
        slate: {
          light: '#4B5566',
          dark: '#9AA3B2',
        },
        // Wordle-style tile feedback, tuned to sit naturally on both the
        // ink and paper surfaces rather than reusing roj/zagros (those are
        // brand accents, not status colors -- conflating the two would
        // make "correct letter" and "our brand gold" mean the same pixel).
        tile: {
          correct: '#4B8A5C',
          present: '#C79A3E',
          absent: '#5A6272',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Naskh Arabic"', '"Noto Sans Arabic"', 'ui-serif', 'serif'],
      },
      keyframes: {
        'ray-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'ray-spin-slow': 'ray-spin 8s linear infinite',
        flip: 'flip 0.5s ease forwards',
        shake: 'shake 0.4s ease',
        'pop-in': 'pop-in 0.15s ease-out',
      },
    },
  },
  plugins: [],
};
