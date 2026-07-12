import React from 'react';
import { useGameStore } from '../game/store';
import { useTranslation } from '../i18n';
import { motion } from 'framer-motion';
import { Pause } from 'lucide-react';

export function PauseMenu() {
  const setPaused = useGameStore(state => state.setPaused);
  const { t } = useTranslation();

  const handleResume = () => {
    // setPaused(false) adjusts startTime to exclude pause duration.
    // Calling requestPointerLock() here is a direct user-gesture call (button
    // click), so the browser will grant it immediately.
    setPaused(false);
    document.getElementById('root')?.requestPointerLock();
  };

  const handleRestart = () => {
    // Full state reset — mirrors CompletionScreen's handlePlayAgain, including
    // pausedAt so the timer reference is clean for the next run.
    useGameStore.setState({
      gameState: 'start',
      startTime: null,
      endTime: null,
      solvedPuzzles: [],
      activeInteractableId: null,
      lookingAtObjectId: null,
      hintsUsed: {},
      wrongAttempts: {},
      isPaused: false,
      pausedAt: null,
      // locale intentionally preserved across runs
    });
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18, type: 'spring', bounce: 0.25 }}
        className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-6 min-w-[320px] shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <Pause className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">{t.pause.title}</h2>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleResume}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-colors shadow-md w-full"
          >
            {t.pause.resume}
          </button>
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-muted border border-border text-foreground font-semibold text-lg rounded-xl hover:border-primary/50 transition-colors w-full"
          >
            {t.pause.restart}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
