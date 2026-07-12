/**
 * Translations interface and English (default) strings for Algebra Escape Room.
 *
 * `Translations` is declared explicitly as a structural interface (all values
 * typed as `string`) so that other locale files can satisfy it without
 * TypeScript rejecting their different string literals.
 *
 * The {key} placeholder in `hud.interactPrompt` is handled by the HUD
 * component, which splits on the literal string "{key}" and renders a
 * <kbd> element in its place.
 */

export interface Translations {
  start: {
    title: string;
    subtitle: string;
    instructions: {
      heading: string;
      move: string;
      look: string;
      interact: string;
      goalLabel: string;
      goal: string;
    };
    button: string;
  };
  hud: {
    cluesFound: string;
    /** Contains "{key}" as a placeholder for the rendered keyboard badge. */
    interactPrompt: string;
  };
  puzzle: {
    correct: string;
    digitRevealed: string;
    continue: string;
    placeholder: string;
    wrongAnswer: string;
    submit: string;
  };
  door: {
    title: string;
    warning: string;
    enter: string;
    unlocked: string;
  };
  completion: {
    title: string;
    subtitle: string;
    timeTaken: string;
    puzzles: string;
    playAgain: string;
  };
}

export const en: Translations = {
  start: {
    title: 'Algebra Escape Room',
    subtitle: 'Solve the puzzles. Find the code. Escape.',
    instructions: {
      heading: 'Instructions',
      move: 'Move around the classroom',
      look: 'Look around (Click canvas to lock pointer)',
      interact: 'Interact with highlighted objects',
      goalLabel: 'Goal',
      goal: 'Solve 3 algebra equations to find the 3-digit door code.',
    },
    button: 'Start Game',
  },
  hud: {
    cluesFound: 'Clues Found',
    interactPrompt: 'Press {key} to Interact',
  },
  puzzle: {
    correct: 'Correct!',
    digitRevealed: 'Digit revealed',
    continue: 'Continue',
    placeholder: 'Enter answer...',
    wrongAnswer: 'Not quite right.',
    submit: 'Submit Answer',
  },
  door: {
    title: 'ELECTRONIC LOCK',
    warning: 'Find all 3 digits in the classroom before attempting to unlock.',
    enter: 'ENTER',
    unlocked: 'UNLOCKED',
  },
  completion: {
    title: 'You Escaped!',
    subtitle: 'Excellent work.',
    timeTaken: 'Time Taken',
    puzzles: 'Puzzles',
    playAgain: 'Play Again',
  },
};
