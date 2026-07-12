import React from 'react';
import { InteractableObject } from '../InteractionSystem';
import { useGameStore } from '../store';

export function DoorLock() {
  const gameState = useGameStore(state => state.gameState);
  const isUnlocked = gameState === 'escaped';
  
  return (
    <group position={[5, 0, -6.9]}>
      {/* Door frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.8, 3, 0.2]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      
      {/* Door panel */}
      <mesh position={[0, 1.5, 0.05]}>
        <boxGeometry args={[1.6, 2.8, 0.1]} />
        <meshStandardMaterial color="#a17b18" />
      </mesh>

      {/* Lock Pad */}
      <group position={[-0.6, 1.4, 0.15]}>
        <mesh>
          <boxGeometry args={[0.2, 0.3, 0.05]} />
          <meshStandardMaterial color="#1a1d26" />
        </mesh>
        
        {/* Status Light */}
        <mesh position={[0, 0.1, 0.03]}>
          <boxGeometry args={[0.05, 0.05, 0.02]} />
          <meshStandardMaterial 
            color={isUnlocked ? "#22c55e" : "#ef4444"} 
            emissive={isUnlocked ? "#22c55e" : "#ef4444"} 
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      <group position={[0, 1.5, 0.2]}>
        <InteractableObject id="door">
          <boxGeometry args={[2, 3.2, 0.5]} />
          <meshBasicMaterial visible={false} />
        </InteractableObject>
      </group>
    </group>
  );
}
