import React, { useRef, useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Raycaster, Vector2, Mesh } from 'three';
import { useGameStore, Controls } from './store';
import { useKeyboardControls } from '@react-three/drei';

export const InteractablesContext = React.createContext<{
  register: (id: string, mesh: Mesh) => void;
  unregister: (id: string) => void;
}>({ register: () => {}, unregister: () => {} });

export function InteractionSystem({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();
  const interactablesRef = useRef<Map<string, Mesh>>(new Map());
  const raycaster = useMemo(() => new Raycaster(), []);
  const center = useMemo(() => new Vector2(0, 0), []);
  
  const setLookingAtObjectId = useGameStore(state => state.setLookingAtObjectId);
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const setActiveInteractableId = useGameStore(state => state.setActiveInteractableId);
  const gameState = useGameStore(state => state.gameState);

  const [subscribe] = useKeyboardControls<Controls>();

  const register = React.useCallback((id: string, mesh: Mesh) => {
    interactablesRef.current.set(id, mesh);
  }, []);

  const unregister = React.useCallback((id: string) => {
    interactablesRef.current.delete(id);
  }, []);

  // Raycasting loop
  useFrame(() => {
    // Read isPaused imperatively to always get the latest value without
    // relying on a stale closure from the render cycle.
    if (gameState !== 'playing' || activeInteractableId !== null || useGameStore.getState().isPaused) {
      if (useGameStore.getState().lookingAtObjectId !== null) {
        setLookingAtObjectId(null);
      }
      return;
    }

    raycaster.setFromCamera(center, camera);
    const meshes = Array.from(interactablesRef.current.values());
    const intersects = raycaster.intersectObjects(meshes, false);

    let foundId: string | null = null;

    if (intersects.length > 0) {
      const hit = intersects[0];
      if (hit.distance < 4.0) { // Interaction range
        // find id
        for (const [id, mesh] of interactablesRef.current.entries()) {
          if (mesh === hit.object) {
            foundId = id;
            break;
          }
        }
      }
    }

    if (useGameStore.getState().lookingAtObjectId !== foundId) {
      setLookingAtObjectId(foundId);
    }
  });

  // Handle 'E' press
  useEffect(() => {
    return subscribe(
      state => state.interact,
      (pressed) => {
        if (!pressed) return; // Only trigger on key down
        const state = useGameStore.getState();
        if (
          state.gameState === 'playing' &&
          state.activeInteractableId === null &&
          state.lookingAtObjectId &&
          !state.isPaused
        ) {
          setActiveInteractableId(state.lookingAtObjectId);
        }
      }
    );
  }, [subscribe, setActiveInteractableId]);

  return (
    <InteractablesContext.Provider value={{ register, unregister }}>
      {children}
    </InteractablesContext.Provider>
  );
}

interface InteractableObjectProps {
  id: string;
  children: React.ReactNode;
}

export function InteractableObject({ id, children }: InteractableObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const { register, unregister } = React.useContext(InteractablesContext);
  const lookingAtObjectId = useGameStore(state => state.lookingAtObjectId);
  
  const isTargeted = lookingAtObjectId === id;

  useEffect(() => {
    if (meshRef.current) {
      register(id, meshRef.current);
    }
    return () => unregister(id);
  }, [id, register, unregister]);

  // Pass down emissive logic to children material if it's a mesh
  // We can wrap children in a group or clone element, but simplest is:
  return (
    <mesh ref={meshRef}>
      {children}
      {isTargeted && (
        <meshBasicMaterial color="#fcd34d" wireframe opacity={0.3} transparent depthTest={false} />
      )}
    </mesh>
  );
}
