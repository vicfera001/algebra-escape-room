import React from 'react';
import { Text } from '@react-three/drei';

export function MathPosters() {
  return (
    <group position={[-7.9, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
      
      {/* Poster 1 */}
      <group position={[-2, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial color="#f0f4f8" />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.55, 2.05]} />
          <meshStandardMaterial color="#2d3142" />
        </mesh>
        <Text position={[0, 0.6, 0.01]} fontSize={0.2} color="#1e293b" anchorY="top">
          Quadratic
        </Text>
        <Text position={[0, 0.2, 0.01]} fontSize={0.25} color="#0f172a">
          ax² + bx + c = 0
        </Text>
      </group>

      {/* Poster 2 */}
      <group position={[0, 0.2, 0]}>
        <mesh>
          <planeGeometry args={[1.2, 1.6]} />
          <meshStandardMaterial color="#fffbeb" />
        </mesh>
        <Text position={[0, 0.4, 0.01]} fontSize={0.2} color="#854d0e" anchorY="top">
          Linear
        </Text>
        <Text position={[0, 0, 0.01]} fontSize={0.25} color="#713f12">
          y = mx + b
        </Text>
      </group>

      {/* Poster 3 */}
      <group position={[2, -0.2, 0]}>
        <mesh>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#fce7f3" />
        </mesh>
        <Text position={[0, 0.5, 0.01]} fontSize={0.25} color="#831843" anchorY="top">
          PEMDAS
        </Text>
        <Text position={[0, 0.1, 0.01]} fontSize={0.15} color="#9d174d" maxWidth={1.3} textAlign="center">
          Parentheses
          Exponents
          Multiply / Divide
          Add / Subtract
        </Text>
      </group>

    </group>
  );
}
