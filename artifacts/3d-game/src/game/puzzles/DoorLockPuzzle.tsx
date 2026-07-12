import React, { useEffect } from 'react';
import { useGameStore } from '../store';
import { useTranslation } from '../../i18n';
import { motion } from 'framer-motion';
import { X, Lock, Unlock } from 'lucide-react';

export function DoorLockPuzzle() {
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const setActiveInteractableId = useGameStore(state => state.setActiveInteractableId);
  const solvedPuzzles = useGameStore(state => state.solvedPuzzles);
  const setGameState = useGameStore(state => state.setGameState);
  const setEndTime = useGameStore(state => state.setEndTime);

  const { t } = useTranslation();
  const [code, setCode] = React.useState(['', '', '']);
  const [errorState, setErrorState] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const inputRefs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (activeInteractableId === 'door') {
      document.exitPointerLock?.();
      setTimeout(() => inputRefs[0].current?.focus(), 100);
      setCode(['', '', '']);
      setErrorState(false);
      setSuccess(false);
    }
  }, [activeInteractableId]);

  if (activeInteractableId !== 'door') return null;

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 2) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join('');

    if (enteredCode === '440') {
      setSuccess(true);
      setTimeout(() => {
        setEndTime(Date.now());
        setGameState('escaped');
        setActiveInteractableId(null);
      }, 1500);
    } else {
      setErrorState(true);
      setTimeout(() => setErrorState(false), 500);
      setCode(['', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  const hasAllClues = solvedPuzzles.length === 3;

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#11131a] border-4 border-[#2d3142] w-full max-w-sm rounded-xl shadow-2xl relative overflow-hidden"
      >
        <div className="p-8">
          <button
            onClick={() => !success && setActiveInteractableId(null)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center mb-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                success ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'
              }`}
            >
              {success ? <Unlock size={32} /> : <Lock size={32} />}
            </div>
            <h2 className="text-2xl font-mono font-bold tracking-widest text-foreground">
              {t.door.title}
            </h2>
            <div className="h-1 w-20 bg-primary/50 mt-4 rounded-full"></div>
          </div>

          {!hasAllClues && !success && (
            <div className="bg-orange-500/10 border border-orange-500/30 text-orange-200 text-sm p-4 rounded-lg mb-6 text-center">
              {t.door.warning}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div
              className="flex justify-center gap-4 mb-8"
              animate={errorState ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  type="text"
                  value={code[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={success}
                  className={`w-16 h-20 text-4xl text-center font-mono font-bold rounded-lg border-2 bg-black text-primary shadow-inner
                    ${
                      errorState
                        ? 'border-destructive text-destructive'
                        : success
                        ? 'border-green-500 text-green-500'
                        : 'border-border focus:border-primary'
                    }
                    focus:outline-none transition-colors`}
                  maxLength={1}
                  placeholder="-"
                />
              ))}
            </motion.div>

            <button
              type="submit"
              disabled={success || code.join('').length < 3}
              className={`w-full py-4 rounded-lg font-bold font-mono text-xl tracking-widest transition-all
                ${
                  success
                    ? 'bg-green-500 text-black'
                    : code.join('').length === 3
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              {success ? t.door.unlocked : t.door.enter}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
