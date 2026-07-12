import React from 'react';
import { Text } from '@react-three/drei';
import { InteractableObject } from '../InteractionSystem';

export function Whiteboard() {
  return (
    <group position={[0, 1.8, -6.9]}>
      {/* Board */}
      <mesh>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial color="#e8f4e8" />
      </mesh>
      
      {/* Frame */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[8.2, 3.2, 0.1]} />
        <meshStandardMaterial color="#2d3142" />
      </mesh>

      {/* Text on board */}
      <Text
        position={[0, 0.5, 0.06]}
        fontSize={0.4}
        color="#1a1d26"
        anchorX="center"
        anchorY="middle"
      >
        2x + 6 = 14
      </Text>
      
      <Text
        position={[0, -0.2, 0.06]}
        fontSize={0.2}
        color="#2d3142"
        anchorX="center"
        anchorY="middle"
      >
        Solve for x
      </Text>

      {/* Invisible thicker interaction box */}
      <InteractableObject id="whiteboard">
        <boxGeometry args={[8, 3, 0.3]} />
        <meshBasicMaterial visible={false} />
      </InteractableObject>
    </group>
  );
}
