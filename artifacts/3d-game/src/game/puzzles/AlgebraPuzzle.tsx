import React, { useEffect } from 'react';
import { useGameStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

export interface PuzzleProps {
  id: string;
  title: string;
  description: string;
  equation: string;
  correctAnswer: string;
  rewardDigit: string;
}

export function AlgebraPuzzle() {
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const setActiveInteractableId = useGameStore(state => state.setActiveInteractableId);
  const addSolvedPuzzle = useGameStore(state => state.addSolvedPuzzle);
  const solvedPuzzles = useGameStore(state => state.solvedPuzzles);
  
  const [inputValue, setInputValue] = React.useState("");
  const [errorState, setErrorState] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Define our 3 puzzles based on their object IDs
  const puzzles: Record<string, PuzzleProps> = {
    'whiteboard': {
      id: 'whiteboard',
      title: 'Whiteboard Problem',
      description: 'Solve the equation to find the first digit of the door code.',
      equation: '2x + 6 = 14',
      correctAnswer: '4',
      rewardDigit: '4'
    },
    'bookshelf': {
      id: 'bookshelf',
      title: 'Hidden Note in Textbook',
      description: 'Solve for y to find the second digit.',
      equation: '3y - 5 = 7',
      correctAnswer: '4',
      rewardDigit: '4'
    },
    'teacher-desk': {
      id: 'teacher-desk',
      title: "Teacher's Note",
      description: 'Find the final digit by solving for z.',
      equation: 'z / 2 + 3 = 8',
      correctAnswer: '10',
      rewardDigit: '0'
    }
  };

  const puzzle = activeInteractableId ? puzzles[activeInteractableId] : null;
  const isSolved = puzzle ? solvedPuzzles.includes(puzzle.id) : false;

  useEffect(() => {
    if (activeInteractableId && !isSolved) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setInputValue("");
      setErrorState(false);
    }
  }, [activeInteractableId, isSolved]);

  // Unlock pointer when mounted (and UI is visible)
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

  const close = () => {
    setActiveInteractableId(null);
  };

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

            <div className="bg-muted rounded-xl p-8 mb-6 flex justify-center border border-border">
              <span className="text-4xl font-mono text-foreground font-bold">{puzzle.equation}</span>
            </div>

            {isSolved ? (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex flex-col items-center gap-2 text-center"
              >
                <CheckCircle2 className="text-primary w-10 h-10 mb-2" />
                <p className="text-foreground font-medium">Correct!</p>
                <p className="text-muted-foreground text-sm">
                  Digit revealed: <span className="text-primary font-bold text-xl">{puzzle.rewardDigit}</span>
                </p>
                <button 
                  onClick={close}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg w-full"
                >
                  Continue
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
                      placeholder="Enter answer..."
                      className={`w-full bg-background border ${errorState ? 'border-destructive' : 'border-border'} rounded-xl px-4 py-3 text-xl text-center font-mono focus:outline-none focus:border-primary transition-colors`}
                    />
                  </motion.div>
                  {errorState && (
                    <div className="absolute -bottom-6 left-0 w-full text-center text-sm text-destructive flex justify-center items-center gap-1">
                      <AlertCircle size={14} /> Not quite right.
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit"
                  className="px-6 py-3 mt-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                  Submit Answer
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
