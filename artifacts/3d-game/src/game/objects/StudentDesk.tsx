import React from 'react';

export function StudentDesk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desk top */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      
      {/* Seat */}
      <mesh position={[0, 0.45, 0.8]}>
        <boxGeometry args={[0.6, 0.05, 0.6]} />
        <meshStandardMaterial color="#2d3142" />
      </mesh>
      
      {/* Legs */}
      {[[-0.55, -0.35], [0.55, -0.35], [-0.55, 0.35], [0.55, 0.35]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.4, pos[1]]}>
          <boxGeometry args={[0.05, 0.8, 0.05]} />
          <meshStandardMaterial color="#4a4f66" />
        </mesh>
      ))}
      
      {/* Seat Leg */}
      <mesh position={[0, 0.225, 0.8]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color="#4a4f66" />
      </mesh>
    </group>
  );
}
