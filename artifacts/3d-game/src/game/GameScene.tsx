import React, { useState } from 'react';
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

  // Pointer lock is active when playing and no modal is open
  const shouldLockPointer = gameState === 'playing' && activeInteractableId === null;

  return (
    <div className="absolute inset-0 bg-black">
      <Canvas shadows camera={{ fov: 75 }}>
        <InteractionSystem>
          <ClassroomWorld onObstaclesGenerated={setObstacles} />
          <Player obstacles={obstacles} />
        </InteractionSystem>
        
        {/* Only enable pointer lock if we are actively playing and not interacting */}
        {shouldLockPointer && (
          <PointerLockControls 
            selector="#root" // click anywhere to lock
          />
        )}
      </Canvas>
    </div>
  );
}
