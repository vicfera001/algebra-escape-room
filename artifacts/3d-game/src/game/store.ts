import React from 'react';
import { create } from 'zustand';

export type GameState = 'start' | 'playing' | 'escaped';

export interface GameStore {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  startTime: number | null;
  endTime: number | null;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  
  // Interaction & UI
  activeInteractableId: string | null;
  setActiveInteractableId: (id: string | null) => void;
  lookingAtObjectId: string | null;
  setLookingAtObjectId: (id: string | null) => void;
  
  // Puzzles
  solvedPuzzles: string[];
  addSolvedPuzzle: (id: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'start',
  setGameState: (state) => set({ gameState: state }),
  startTime: null,
  endTime: null,
  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),
  
  activeInteractableId: null,
  setActiveInteractableId: (id) => set({ activeInteractableId: id }),
  lookingAtObjectId: null,
  setLookingAtObjectId: (id) => set({ lookingAtObjectId: id }),
  
  solvedPuzzles: [],
  addSolvedPuzzle: (id) => set((state) => ({ 
    solvedPuzzles: state.solvedPuzzles.includes(id) ? state.solvedPuzzles : [...state.solvedPuzzles, id] 
  })),
}));

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  interact = 'interact',
}
