import React from 'react';
import { KeyboardControls } from '@react-three/drei';
import { GameScene } from './game/GameScene';
import { HUD } from './game/HUD';
import { UIRoot } from './game/UIRoot';
import { StartScreen } from './screens/StartScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { Controls, useGameStore } from './game/store';
import { AnimatePresence } from 'framer-motion';

function App() {
  const gameState = useGameStore(state => state.gameState);

  const keyMap = React.useMemo(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.interact, keys: ['KeyE'] },
  ], []);

  return (
    <KeyboardControls map={keyMap}>
      <div className="w-full h-[100dvh] overflow-hidden relative bg-black font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
        
        {/* 3D Scene always renders in background */}
        <GameScene />
        
        {/* HUD over the game */}
        <HUD />
        
        {/* Modals and Overlays */}
        <UIRoot />

        {/* Full Screen Transitions */}
        <AnimatePresence>
          {gameState === 'start' && <StartScreen key="start" />}
          {gameState === 'escaped' && <CompletionScreen key="end" />}
        </AnimatePresence>
      </div>
    </KeyboardControls>
  );
}

export default App;
