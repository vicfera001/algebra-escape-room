import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { Box3 } from 'three';
import { ClassroomWorld } from './ClassroomWorld';
import { Player } from './Player';
import { InteractionSystem } from './InteractionSystem';
import { useGameStore } from './store';

export function GameScene() {
  const [obstacles, setObstacles] = useState<Box3[]>([]);
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const gameState = useGameStore(state => state.gameState);
  const isPaused = useGameStore(state => state.isPaused);
  const setPaused = useGameStore(state => state.setPaused);

  // Pointer lock is active only when playing, no modal is open, and not paused.
  const shouldLockPointer =
    gameState === 'playing' && activeInteractableId === null && !isPaused;

  // When the browser releases pointer lock (e.g. the player pressed Escape),
  // treat that as a pause request — but only while actively playing with no
  // modal open and not already paused. This avoids false pauses when a puzzle
  // modal closes (activeInteractableId !== null) or the game ends.
  useEffect(() => {
    const handlePointerLockChange = () => {
      if (document.pointerLockElement) return; // lock acquired — nothing to do
      const s = useGameStore.getState();
      if (s.gameState === 'playing' && s.activeInteractableId === null && !s.isPaused) {
        setPaused(true);
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [setPaused]);

  return (
    <div className="absolute inset-0 bg-black">
      <Canvas shadows camera={{ fov: 75 }}>
        <InteractionSystem>
          <ClassroomWorld onObstaclesGenerated={setObstacles} />
          <Player obstacles={obstacles} />
        </InteractionSystem>

        {/* Only enable pointer lock if we are actively playing, not interacting,
            and not paused. Unmounting PointerLockControls while paused prevents
            the component from re-locking the pointer automatically. */}
        {shouldLockPointer && (
          <PointerLockControls
            selector="#root" // click anywhere to lock
          />
        )}
      </Canvas>
    </div>
  );
}
