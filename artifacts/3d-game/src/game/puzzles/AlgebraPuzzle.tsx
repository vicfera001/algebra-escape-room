import React, { useEffect } from 'react';
import { useGameStore } from '../store';
import { getLocalizedPuzzle, PUZZLES } from '../../content/puzzles';
import { useTranslation } from '../../i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

const MAX_HINTS = 3;

export function AlgebraPuzzle() {
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const setActiveInteractableId = useGameStore(state => state.setActiveInteractableId);
  const addSolvedPuzzle = useGameStore(state => state.addSolvedPuzzle);
  const solvedPuzzles = useGameStore(state => state.solvedPuzzles);
  const hintsUsed = useGameStore(state => state.hintsUsed);
  const incrementHintsUsed = useGameStore(state => state.incrementHintsUsed);

  const { t, locale } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const [errorState, setErrorState] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const puzzle = activeInteractableId
    ? getLocalizedPuzzle(activeInteractableId, locale)
    : null;
  const isSolved = puzzle ? solvedPuzzles.includes(puzzle.id) : false;

  // How many hints have already been revealed for this puzzle (persists across open/close)
  const hintCount = puzzle ? (hintsUsed[puzzle.id] ?? 0) : 0;
  const canRevealMoreHints = hintCount < MAX_HINTS;
  // Slice of hint strings the player has earned so far
  const revealedHints = puzzle ? puzzle.hints.slice(0, hintCount) : [];
  // Cumulative total across all puzzles — used only for the displayed button counter
  const totalHintsUsed = Object.values(hintsUsed).reduce((sum, count) => sum + count, 0);

  useEffect(() => {
    if (activeInteractableId && !isSolved) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setInputValue('');
      setErrorState(false);
    }
  }, [activeInteractableId, isSolved]);

  // Release pointer lock when a puzzle modal is open
  useEffect(() => {
    if (activeInteractableId) {
      document.exitPointerLock?.();
    }
  }, [activeInteractableId]);

  if (!puzzle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;
    if (inputValue.trim() === puzzle.correctAnswer) {
      addSolvedPuzzle(puzzle.id);
    } else {
      setErrorState(true);
      setTimeout(() => setErrorState(false), 500);
    }
  };

  const handleHint = () => {
    if (puzzle && canRevealMoreHints) {
      incrementHintsUsed(puzzle.id);
    }
  };

  const close = () => {
    setActiveInteractableId(null);
  };

  // Replace "{n}" placeholder with the hint number
  const hintLabel = (n: number) =>
    t.puzzle.hintLabel.replace('{n}', String(n));

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden relative"
        >
          <div className="p-6">
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-primary mb-2">{puzzle.title}</h2>
            <p className="text-muted-foreground mb-6">{puzzle.description}</p>

            <div className="bg-muted rounded-xl p-8 mb-4 flex justify-center border border-border">
              <span className="text-4xl font-mono text-foreground font-bold">{puzzle.equation}</span>
            </div>

            {/* Revealed hints — shown whenever at least one hint has been used */}
            <AnimatePresence initial={false}>
              {revealedHints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4 flex flex-col gap-2"
                >
                  {revealedHints.map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3"
                    >
                      <span className="text-xs font-bold text-primary/70 uppercase tracking-wider block mb-1">
                        {hintLabel(i + 1)}
                      </span>
                      <span className="text-sm text-muted-foreground leading-snug">{text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {isSolved ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex flex-col items-center gap-2 text-center"
              >
                <CheckCircle2 className="text-primary w-10 h-10 mb-2" />
                <p className="text-foreground font-medium">{t.puzzle.correct}</p>
                <p className="text-muted-foreground text-sm">
                  {t.puzzle.digitRevealed}:{' '}
                  <span className="text-primary font-bold text-xl">{puzzle.rewardDigit}</span>
                </p>
                <button
                  onClick={close}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg w-full"
                >
                  {t.puzzle.continue}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <motion.div
                    animate={errorState ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      ref={inputRef}
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t.puzzle.placeholder}
                      className={`w-full bg-background border ${
                        errorState ? 'border-destructive' : 'border-border'
                      } rounded-xl px-4 py-3 text-xl text-center font-mono focus:outline-none focus:border-primary transition-colors`}
                    />
                  </motion.div>
                  {errorState && (
                    <div className="absolute -bottom-6 left-0 w-full text-center text-sm text-destructive flex justify-center items-center gap-1">
                      <AlertCircle size={14} /> {t.puzzle.wrongAnswer}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  {/* Hint button — visible until all 3 hints are revealed */}
                  {canRevealMoreHints && (
                    <button
                      type="button"
                      onClick={handleHint}
                      className="flex items-center gap-2 px-4 py-3 bg-muted border border-border text-muted-foreground font-medium rounded-xl hover:border-primary/50 hover:text-foreground transition-colors"
                    >
                      <Lightbulb size={16} className="text-primary/70" />
                      {t.puzzle.hintButton}
                      <span className="text-xs font-mono text-primary/60">
                        {totalHintsUsed}/{PUZZLES.length * MAX_HINTS}
                      </span>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                  >
                    {t.puzzle.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
