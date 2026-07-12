import React from 'react';
import { AlgebraPuzzle } from './puzzles/AlgebraPuzzle';
import { DoorLockPuzzle } from './puzzles/DoorLockPuzzle';
import { useGameStore } from './store';
import { PauseMenu } from '../screens/PauseMenu';

export function UIRoot() {
  const activeInteractableId = useGameStore(state => state.activeInteractableId);
  const gameState = useGameStore(state => state.gameState);
  const isPaused = useGameStore(state => state.isPaused);

  if (gameState !== 'playing') return null;

  // Pause menu is shown on top of everything when paused. The puzzle modals
  // are not rendered while paused — pausing only happens when no modal is open
  // (activeInteractableId === null), so this is consistent.
  if (isPaused) return <PauseMenu />;

  return (
    <>
      {(activeInteractableId === 'whiteboard' ||
        activeInteractableId === 'bookshelf' ||
        activeInteractableId === 'teacher-desk') && <AlgebraPuzzle />}

      {activeInteractableId === 'door' && <DoorLockPuzzle />}
    </>
  );
}
