import React from 'react';
import { useGameStore } from '../game/store';
import { useTranslation } from '../i18n';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function StartScreen() {
  const setGameState = useGameStore(state => state.setGameState);
  const setStartTime = useGameStore(state => state.setStartTime);

  const { t } = useTranslation();

  const handleStart = () => {
    setStartTime(Date.now());
    setGameState('playing');
  };

  return (
    <div className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Floating math background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {['x', 'y', 'z', '=', '+', '-', '2', '4', '8'].map((char, i) => (
          <motion.div
            key={i}
            className="absolute text-primary font-mono text-6xl font-bold"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              x: [null, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            {char}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card p-10 rounded-2xl border border-border shadow-2xl text-center w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

          <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />

          <h1 className="text-5xl font-extrabold text-primary mb-2 tracking-tight">
            {t.start.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-10">{t.start.subtitle}</p>

          <div className="bg-muted/50 rounded-xl p-6 text-left mb-10 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider">
              {t.start.instructions.heading}
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-sm">
                  W A S D
                </kbd>
                <span>{t.start.instructions.move}</span>
              </li>
              <li className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-sm">
                  Mouse
                </kbd>
                <span>{t.start.instructions.look}</span>
              </li>
              <li className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-sm">
                  E
                </kbd>
                <span>{t.start.instructions.interact}</span>
              </li>
              <li className="flex items-center gap-3 mt-4 text-primary">
                <span className="font-bold">Goal:</span>
                <span>{t.start.instructions.goal}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold text-xl rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] w-full max-w-sm mx-auto block"
          >
            <span className="relative z-10">{t.start.button}</span>
            <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
