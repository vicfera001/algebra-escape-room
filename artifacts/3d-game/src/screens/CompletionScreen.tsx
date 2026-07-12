import React from 'react';
import { useGameStore } from '../game/store';
import { motion } from 'framer-motion';
import { DoorOpen } from 'lucide-react';

export function CompletionScreen() {
  const setGameState = useGameStore(state => state.setGameState);
  const startTime = useGameStore(state => state.startTime);
  const endTime = useGameStore(state => state.endTime);
  const solvedPuzzles = useGameStore(state => state.solvedPuzzles);

  const handlePlayAgain = () => {
    useGameStore.setState({ 
      gameState: 'start', 
      startTime: null, 
      endTime: null, 
      solvedPuzzles: [],
      activeInteractableId: null,
      lookingAtObjectId: null
    });
  };

  const elapsedStr = React.useMemo(() => {
    if (!startTime || !endTime) return "00:00";
    const elapsed = Math.floor((endTime - startTime) / 1000);
    const m = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const s = (elapsed % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [startTime, endTime]);

  return (
    <div className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      <motion.div 
        className="relative z-10 flex flex-col items-center max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <div className="bg-card p-10 rounded-2xl border border-primary/50 shadow-[0_0_50px_rgba(251,191,36,0.15)] text-center w-full relative overflow-hidden">
          
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30"
          >
            <DoorOpen className="w-12 h-12 text-primary" />
          </motion.div>
          
          <h1 className="text-5xl font-extrabold text-foreground mb-2 tracking-tight">
            🎉 You Escaped!
          </h1>
          <p className="text-xl text-primary font-medium mb-10">Excellent work.</p>
          
          <div className="bg-muted/50 rounded-xl p-6 text-center mb-10 border border-border/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-3 bg-card rounded-lg border border-border">
                <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Time Taken</span>
                <span className="text-3xl font-mono text-foreground">{elapsedStr}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-card rounded-lg border border-border">
                <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Puzzles</span>
                <span className="text-3xl font-mono text-primary">{solvedPuzzles.length}/3</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handlePlayAgain}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold text-xl rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg w-full max-w-sm mx-auto block"
          >
            <span className="relative z-10">Play Again</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
