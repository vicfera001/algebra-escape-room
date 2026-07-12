import React from 'react';
import { useGameStore } from './store';
import { useTranslation } from '../i18n';
import { motion, AnimatePresence } from 'framer-motion';

export function HUD() {
  const gameState = useGameStore(state => state.gameState);
  const startTime = useGameStore(state => state.startTime);
  const lookingAtObjectId = useGameStore(state => state.lookingAtObjectId);
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const solvedPuzzles = useGameStore(state => state.solvedPuzzles);

  const { t } = useTranslation();
  const [timeStr, setTimeStr] = React.useState('00:00');

  React.useEffect(() => {
    if (gameState !== 'playing' || !startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const m = Math.floor(elapsed / 60).toString().padStart(2, '0');
      const s = (elapsed % 60).toString().padStart(2, '0');
      setTimeStr(`${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, startTime]);

  if (gameState !== 'playing') return null;

  const isInteracting = activeInteractableId !== null;

  // The interactPrompt translation contains "{key}" as a placeholder for the
  // keyboard badge. Split on it so we can render <kbd>E</kbd> inline.
  const promptParts = t.hud.interactPrompt.split('{key}');

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      <div className="flex justify-between items-start">
        <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border shadow-lg">
          <div className="text-xl font-mono text-primary flex items-center gap-2">
            <span>⏱</span> {timeStr}
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border shadow-lg">
          <div className="text-lg font-bold text-foreground">
            {t.hud.cluesFound}:{' '}
            <span className="text-primary">{solvedPuzzles.length}/3</span>
          </div>
        </div>
      </div>

      {!isInteracting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white/80 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.5)]"></div>
        </div>
      )}

      <div className="flex justify-center pb-8">
        <AnimatePresence>
          {lookingAtObjectId && !isInteracting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-card/90 backdrop-blur-md px-6 py-3 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            >
              <p className="text-lg font-medium text-foreground flex items-center gap-2">
                <span className="text-xl">🔍</span>
                {promptParts[0]}
                <kbd className="mx-1 px-2 py-0.5 bg-muted rounded border border-border font-mono text-sm">
                  E
                </kbd>
                {promptParts[1]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
