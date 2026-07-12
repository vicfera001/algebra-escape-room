import React from "react";
import { create } from "zustand";
import type { SupportedLocale } from "../i18n";

export type GameState = "start" | "playing" | "escaped";

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

  // Hint tracking — keyed by puzzle id
  hintsUsed: Record<string, number>;
  incrementHintsUsed: (puzzleId: string) => void;

  // Wrong-attempt tracking — keyed by puzzle id
  wrongAttempts: Record<string, number>;
  incrementWrongAttempts: (puzzleId: string) => void;

  // Pause state
  isPaused: boolean;
  /** Timestamp (ms) when the current pause began; null when not paused. */
  pausedAt: number | null;
  setPaused: (paused: boolean) => void;
  togglePaused: () => void;

  // Locale
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: "start",
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
  addSolvedPuzzle: (id) =>
    set((state) => ({
      solvedPuzzles: state.solvedPuzzles.includes(id)
        ? state.solvedPuzzles
        : [...state.solvedPuzzles, id],
    })),

  hintsUsed: {},
  incrementHintsUsed: (puzzleId) =>
    set((state) => ({
      hintsUsed: {
        ...state.hintsUsed,
        [puzzleId]: (state.hintsUsed[puzzleId] ?? 0) + 1,
      },
    })),

  wrongAttempts: {},
  incrementWrongAttempts: (puzzleId) =>
    set((state) => ({
      wrongAttempts: {
        ...state.wrongAttempts,
        [puzzleId]: (state.wrongAttempts[puzzleId] ?? 0) + 1,
      },
    })),

  isPaused: false,
  pausedAt: null,
  setPaused: (paused) =>
    set((state) => {
      if (paused) {
        return { isPaused: true, pausedAt: Date.now() };
      }
      // On resume: shift startTime forward by the duration of the pause so the
      // elapsed calculation (Date.now() - startTime) excludes paused time.
      const pausedDuration = state.pausedAt != null ? Date.now() - state.pausedAt : 0;
      return {
        isPaused: false,
        pausedAt: null,
        startTime: state.startTime != null ? state.startTime + pausedDuration : state.startTime,
      };
    }),
  togglePaused: () =>
    set((state) => {
      if (!state.isPaused) {
        return { isPaused: true, pausedAt: Date.now() };
      }
      const pausedDuration = state.pausedAt != null ? Date.now() - state.pausedAt : 0;
      return {
        isPaused: false,
        pausedAt: null,
        startTime: state.startTime != null ? state.startTime + pausedDuration : state.startTime,
      };
    }),

  locale: "pt-BR",
  setLocale: (locale) => set({ locale }),
}));

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  interact = "interact",
}
