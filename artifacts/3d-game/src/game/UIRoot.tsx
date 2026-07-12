import React from 'react';
import { AlgebraPuzzle } from './puzzles/AlgebraPuzzle';
import { DoorLockPuzzle } from './puzzles/DoorLockPuzzle';
import { useGameStore } from './store';

export function UIRoot() {
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const gameState = useGameStore(state => state.gameState);

  if (gameState !== 'playing') return null;

  return (
    <>
      {(activeInteractableId === 'whiteboard' || 
        activeInteractableId === 'bookshelf' || 
        activeInteractableId === 'teacher-desk') && <AlgebraPuzzle />}
      
      {activeInteractableId === 'door' && <DoorLockPuzzle />}
    </>
  );
}
