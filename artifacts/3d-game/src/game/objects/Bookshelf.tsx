import React, { useMemo } from 'react';
import { InteractableObject } from '../InteractionSystem';

export function Bookshelf() {
  const books = useMemo(() => {
    const colors = ['#e11d48', '#2563eb', '#16a34a', '#ca8a04', '#ea580c', '#4f46e5'];
    const items = [];
    // 3 shelves
    for (let s = 0; s < 3; s++) {
      const y = 0.5 + s * 0.7;
      let xOffset = -1.2;
      while (xOffset < 1.2) {
        const width = 0.05 + Math.random() * 0.1;
        const height = 0.4 + Math.random() * 0.15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random tilt for some books
        const rotZ = Math.random() > 0.8 ? (Math.random() - 0.5) * 0.3 : 0;
        
        items.push({ x: xOffset + width/2, y: y + height/2, width, height, color, rotZ });
        xOffset += width + 0.02 + (Math.random() * 0.05);
      }
    }
    return items;
  }, []);

  return (
    <group position={[0, 0, 6.8]}>
      {/* Frame */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[3, 2.5, 0.6]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      
      {/* Inside cutout (simulated by making inner black box) */}
      <mesh position={[0, 1.25, 0.05]}>
        <boxGeometry args={[2.8, 2.3, 0.55]} />
        <meshStandardMaterial color="#1a120e" />
      </mesh>

      {/* Shelves */}
      {[0.5, 1.2, 1.9].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, 0.05]}>
          <boxGeometry args={[2.8, 0.05, 0.5]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
      ))}

      {/* Books */}
      <group position={[0, 0, 0.1]}>
        {books.map((b, i) => (
          <mesh key={`book-${i}`} position={[b.x, b.y, 0]} rotation={[0, 0, b.rotZ]}>
            <boxGeometry args={[b.width, b.height, 0.4]} />
            <meshStandardMaterial color={b.color} roughness={0.7} />
          </mesh>
        ))}
      </group>

      <group position={[0, 1.25, -0.2]}>
        <InteractableObject id="bookshelf">
          <boxGeometry args={[3.2, 2.7, 1]} />
          <meshBasicMaterial visible={false} />
        </InteractableObject>
      </group>
    </group>
  );
}
