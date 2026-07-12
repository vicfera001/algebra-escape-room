import React from 'react';
import { InteractableObject } from '../InteractionSystem';

export function TeacherDesk() {
  return (
    <group position={[-4, 0, -4]} rotation={[0, Math.PI / 4, 0]}>
      {/* Desk top */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#6B4F12" />
      </mesh>
      
      {/* Legs */}
      {[[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.5, pos[1]]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#2d3142" />
        </mesh>
      ))}

      {/* Paper/Note */}
      <mesh position={[0.5, 1.06, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <group position={[0, 0.6, 0]}>
        <InteractableObject id="teacher-desk">
          <boxGeometry args={[3.2, 1.2, 1.7]} />
          <meshBasicMaterial visible={false} />
        </InteractableObject>
      </group>
    </group>
  );
}
