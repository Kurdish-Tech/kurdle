import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DIALECTS, WORD_LENGTH, MAX_GUESSES } from './lib/dialects';
import { getWordOfDay, evaluateGuess, isWin } from './lib/gameLogic';
import { loadStats, recordResult, loadTodayState, saveTodayState } from './lib/stats';
import { buildShareText, shareResult } from './lib/share';
import { computeLetterStatus } from './components/Keyboard';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import DialectToggle from './components/DialectToggle';
import WordRevealCard from './components/WordRevealCard';
import StatsModal from './components/StatsModal';
import RojDisc from './components/RojDisc';

const BASE = import.meta.env.BASE_URL;

function normalize(s) {
  return s.trim().toLowerCase();
}

export default function App() {
  const [dialectKey, setDialectKey] = useState('kmr');
  const dialect = DIALECTS[dialectKey];

  const [wordData, setWordData] = useState(null); // { guessSet, answer, glosses, puzzleNumber }
  const [loadError, setLoadError] = useState(null);
  const [history, setHistory] = useState([]); // [{letters, evaluation}]
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // playing | won | lost
  const [shakeRow, setShakeRow] = useState(false);
  const [toast, setToast] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [shareState, setShareState] = useState(null);
  const [stats, setStats] = useState(() => loadStats('kmr'));
  const toastTimer = useRef(null);

  const showToast = useCallback((msg, ms = 1600) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), ms);
  }, []);

  // Load this dialect's word list + resolve today's answer + restore
  // in-progress state, whenever the dialect changes.
  useEffect(() => {
    let cancelled = false;
    setWordData(null);
    setLoadError(null);
    setHistory([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setStats(loadStats(dialectKey));

    fetch(`${BASE}${dialect.wordListUrl}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} loading word list`);
        return res.json();
      })
      .then(({ guesses, answers, glosses }) => {
        if (cancelled) return;
        const { word, puzzleNumber } = getWordOfDay(answers, new Date());
        const guessSet = new Set(guesses.map((w) => w.toLowerCase()));
        guessSet.add(word.toLowerCase()); // the answer is always a valid guess even if
        // it fell just under the answer-frequency bar in a neighbouring list
        setWordData({ guessSet, answer: word, glosses, puzzleNumber });

        const saved = loadTodayState(dialectKey, puzzleNumber);
        if (saved) {
          setHistory(saved.history);
          setGameStatus(saved.gameStatus);
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [dialectKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const letterStatus = useMemo(() => computeLetterStatus(history), [history]);

  const finishGame = useCallback(
    (won, finalHistory) => {
      setGameStatus(won ? 'won' : 'lost');
      const newStats = recordResult(dialectKey, {
        puzzleNumber: wordData.puzzleNumber,
        won,
        guessCount: finalHistory.length,
      });
      setStats(newStats);
      saveTodayState(dialectKey, wordData.puzzleNumber, {
        history: finalHistory,
        gameStatus: won ? 'won' : 'lost',
      });
      setTimeout(() => setShowStats(true), 1400);
    },
    [dialectKey, wordData]
  );

  const submitGuess = useCallback(() => {
    if (!wordData || gameStatus !== 'playing') return;
    if (currentGuess.length !== WORD_LENGTH) {
      setShakeRow(true);
      showToast('Ne bes e / Not enough letters');
      setTimeout(() => setShakeRow(false), 400);
      return;
    }
    const normalized = normalize(currentGuess);
    if (!wordData.guessSet.has(normalized)) {
      setShakeRow(true);
      showToast('Ne di ferhengê de ye / Not in word list');
      setTimeout(() => setShakeRow(false), 400);
      return;
    }
    const evaluation = evaluateGuess(normalized, wordData.answer.toLowerCase());
    const row = { letters: currentGuess.split(''), evaluation };
    const newHistory = [...history, row];
    setHistory(newHistory);
    setCurrentGuess('');

    const won = isWin(evaluation);
    if (won) {
      finishGame(true, newHistory);
    } else if (newHistory.length >= MAX_GUESSES) {
      finishGame(false, newHistory);
    } else {
      saveTodayState(dialectKey, wordData.puzzleNumber, { history: newHistory, gameStatus: 'playing' });
    }
  }, [wordData, gameStatus, currentGuess, history, dialectKey, finishGame, showToast]);

  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'playing') return;
      if (key === 'ENTER') return submitGuess();
      if (key === 'BACKSPACE') return setCurrentGuess((g) => g.slice(0, -1));
      setCurrentGuess((g) => (g.length < WORD_LENGTH ? g + key : g));
    },
    [gameStatus, submitGuess]
  );

  // Physical keyboard support -- Latin dialects only, since mapping a
  // Latin physical keyboard to Sorani's Arabic on-screen keys isn't a
  // reasonable 1:1 mapping (that needs a real Arabic/Kurdish IME, which
  // players already have configured system-wide if they use one).
  useEffect(() => {
    if (dialect.dir === 'rtl') return;
    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter') return handleKey('ENTER');
      if (e.key === 'Backspace') return handleKey('BACKSPACE');
      const k = e.key.toLowerCase();
      if (dialect.alphabet.includes(k)) handleKey(k);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dialect, handleKey]);

  const handleShare = async () => {
    const text = buildShareText({
      dialectLabel: dialect.label,
      puzzleNumber: wordData.puzzleNumber,
      history: history.map((r) => r.evaluation),
      won: gameStatus === 'won',
      maxGuesses: MAX_GUESSES,
    });
    const result = await shareResult(text);
    setShareState(result);
    setTimeout(() => setShareState(null), 2000);
  };

  const gloss = wordData?.glosses?.[wordData.answer];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 font-body">
      <header className="w-full max-w-md flex items-center justify-between mb-4">
        <a href="https://kurdish-tech.github.io/" className="flex items-center gap-2">
          <RojDisc size={28} className="text-roj" />
          <span className="font-display font-bold text-lg">Kurdle</span>
        </a>
        <button
          type="button"
          onClick={() => setShowStats(true)}
          className="text-sm font-semibold px-3 py-1.5 rounded-full border border-paper-border dark:border-ink-border hover:bg-paper-raised dark:hover:bg-ink-raised transition-colors"
        >
          Amar
        </button>
      </header>

      {/* Not disabled mid-game: each dialect's progress is saved separately
          (loadTodayState/saveTodayState are keyed by dialectKey), so
          switching and switching back loses nothing. */}
      <DialectToggle current={dialectKey} onChange={setDialectKey} />

      <div className="flex-1 flex flex-col items-center justify-center w-full gap-6 mt-6">
        {loadError && (
          <p className="text-tile-absent text-sm">Nekarî were barkirin: {loadError}</p>
        )}
        {!loadError && !wordData && (
          <p className="text-slate-light dark:text-slate-dark text-sm">Bar dibe…</p>
        )}
        {wordData && (
          <>
            <Board history={history} currentGuess={currentGuess} shakeRow={shakeRow} dir={dialect.dir} />

            {gameStatus !== 'playing' && (
              <WordRevealCard
                word={wordData.answer}
                gloss={gloss}
                dialect={dialect}
                won={gameStatus === 'won'}
              />
            )}

            {toast && (
              <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-ink text-paper dark:bg-paper dark:text-ink px-4 py-2 rounded-lg text-sm font-semibold shadow-lg z-50">
                {toast}
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full mt-4">
        <Keyboard
          rows={dialect.keyboardRows}
          letterStatus={letterStatus}
          onKey={handleKey}
          onEnter={() => handleKey('ENTER')}
          onBackspace={() => handleKey('BACKSPACE')}
          dir={dialect.dir}
          enterLabel={dialect.dir === 'rtl' ? 'وەرگرە' : 'ENTER'}
          backLabel="⌫"
        />
      </div>

      {showStats && wordData && (
        <StatsModal
          stats={{ ...stats, puzzleNumber: wordData.puzzleNumber }}
          onClose={() => setShowStats(false)}
          onShare={handleShare}
          shareEnabled={gameStatus !== 'playing'}
          shareState={shareState}
        />
      )}
    </div>
  );
}
