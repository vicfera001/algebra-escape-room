import React, { useMemo } from 'react';
import { Box3, Vector3 } from 'three';
import { Whiteboard } from './objects/Whiteboard';
import { TeacherDesk } from './objects/TeacherDesk';
import { StudentDesk } from './objects/StudentDesk';
import { Bookshelf } from './objects/Bookshelf';
import { DoorLock } from './objects/DoorLock';
import { MathPosters } from './objects/MathPoster';

export function ClassroomWorld({ onObstaclesGenerated }: { onObstaclesGenerated: (boxes: Box3[]) => void }) {
  
  // Calculate bounding boxes for major furniture to pass to player collision
  React.useEffect(() => {
    const boxes = [];
    
    // Teacher Desk Box
    boxes.push(new Box3().setFromCenterAndSize(
      new Vector3(-4, 0.6, -4),
      new Vector3(3.2, 1.2, 2.5) // Roughly rotated bounds
    ));

    // Student Desks (2 rows x 3 cols)
    const startX = -2.5;
    const startZ = -1;
    const spacingX = 2.5;
    const spacingZ = 2.5;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const x = startX + col * spacingX;
        const z = startZ + row * spacingZ;
        boxes.push(new Box3().setFromCenterAndSize(
          new Vector3(x, 0.5, z),
          new Vector3(1.5, 1, 1.5) // Included seat area
        ));
      }
    }

    // Bookshelf
    boxes.push(new Box3().setFromCenterAndSize(
      new Vector3(0, 1.25, 6.8),
      new Vector3(3, 2.5, 0.8)
    ));

    onObstaclesGenerated(boxes);
  }, [onObstaclesGenerated]);

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#ffe" />
      <directionalLight position={[2, 4, -2]} intensity={0.8} color="#fff" castShadow />
      
      {/* Corner fill lights */}
      <pointLight position={[-7, 3, -6]} intensity={0.3} distance={10} color="#aaf" />
      <pointLight position={[7, 3, 6]} intensity={0.3} distance={10} color="#faa" />

      {/* Room Structure */}
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial color="#8a9ba8" />
      </mesh>
      {/* Floor Grid overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[16, 14, 16, 14]} />
        <meshBasicMaterial color="#6a7b88" wireframe opacity={0.2} transparent />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Walls */}
      {/* Front (z=-7) */}
      <mesh position={[0, 2, -7]}>
        <planeGeometry args={[16, 4]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
      {/* Back (z=7) */}
      <mesh position={[0, 2, 7]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[16, 4]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
      {/* Left (x=-8) */}
      <mesh position={[-8, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#e5e0d8" /> {/* Slightly darker for depth */}
      </mesh>
      {/* Right (x=8) */}
      <mesh position={[8, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#f0ebd3" />
      </mesh>

      {/* Furniture & Objects */}
      <Whiteboard />
      <TeacherDesk />
      
      {/* Student Desks (2 rows of 3) */}
      <StudentDesk position={[-2.5, 0, -1]} />
      <StudentDesk position={[0, 0, -1]} />
      <StudentDesk position={[2.5, 0, -1]} />
      
      <StudentDesk position={[-2.5, 0, 1.5]} />
      <StudentDesk position={[0, 0, 1.5]} />
      <StudentDesk position={[2.5, 0, 1.5]} />

      <Bookshelf />
      <DoorLock />
      <MathPosters />
      
    </group>
  );
}
