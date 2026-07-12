import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Sphere, Box3 } from 'three';
import { useKeyboardControls } from '@react-three/drei';
import { Controls, useGameStore } from './store';

const SPEED = 4;
const INTERACTION_DISTANCE = 3.5;

interface PlayerProps {
  obstacles?: Box3[];
}

export function Player({ obstacles = [] }: PlayerProps) {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls<Controls>();
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const gameState = useGameStore(state => state.gameState);
  
  const velocity = React.useRef(new Vector3());
  const direction = React.useRef(new Vector3());
  const frontVector = React.useRef(new Vector3());
  const sideVector = React.useRef(new Vector3());

  // Set initial position
  React.useEffect(() => {
    camera.position.set(0, 1.7, 4);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  useFrame((state, delta) => {
    if (gameState !== 'playing' || activeInteractableId !== null) return;
    // Don't move if pointer lock is not active (like when starting or paused)
    if (!document.pointerLockElement) return;

    const keys = getKeys();
    
    frontVector.current.set(0, 0, (keys.back ? 1 : 0) - (keys.forward ? 1 : 0));
    sideVector.current.set((keys.left ? 1 : 0) - (keys.right ? 1 : 0), 0, 0);
    
    direction.current
      .subVectors(frontVector.current, sideVector.current)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // X/Z movement
    velocity.current.x = direction.current.x;
    velocity.current.z = direction.current.z;

    const oldPos = camera.position.clone();
    
    // Apply movement
    camera.position.x += velocity.current.x * delta;
    camera.position.z += velocity.current.z * delta;

    // Room boundaries (x: -8 to 8, z: -7 to 7 approx, slightly inset)
    if (camera.position.x < -7.5) camera.position.x = -7.5;
    if (camera.position.x > 7.5) camera.position.x = 7.5;
    if (camera.position.z < -6.5) camera.position.z = -6.5;
    if (camera.position.z > 6.5) camera.position.z = 6.5;

    // Very basic collision against boxes
    const playerSphere = new Sphere(camera.position, 0.4); // 0.4 radius cylinder for player body essentially
    // We only care about XZ overlap for simplicity since we don't jump
    for (const box of obstacles) {
      // Expand box by player radius for Minkowski sum approach
      const expandedBox = box.clone().expandByScalar(0.4);
      if (expandedBox.containsPoint(camera.position)) {
        // Simple resolution: revert movement if colliding
        camera.position.copy(oldPos);
        break;
      }
    }
  });

  return null;
}
