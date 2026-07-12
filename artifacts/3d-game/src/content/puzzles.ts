/**
 * Puzzle content definitions for Algebra Escape Room.
 *
 * Each entry is a self-contained puzzle definition consumed by the puzzle
 * components. Keeping content here (rather than inside component files)
 * makes it possible to swap, extend, or localize puzzle sets without
 * touching game logic.
 *
 * hint1 — Directional: points the player toward what deserves attention.
 * hint2 — Conceptual: identifies the relevant mathematical idea.
 * hint3 — Strong guidance: substantial help without giving away the answer.
 */

export interface PuzzleDefinition {
  /** Must match the InteractableObject id used in the 3D scene. */
  id: string;
  title: string;
  description: string;
  /** The equation or challenge displayed to the player. */
  equation: string;
  /** The exact string the player must submit (numeric, as a string). */
  correctAnswer: string;
  /** Single digit revealed to the player on success; used to build the door code. */
  rewardDigit: string;
  hints: [string, string, string];
}

export const PUZZLES: PuzzleDefinition[] = [
  {
    id: 'whiteboard',
    title: 'Whiteboard Problem',
    description: 'Solve the equation to find the first digit of the door code.',
    equation: '2x + 6 = 14',
    correctAnswer: '4',
    rewardDigit: '4',
    hints: [
      'Look at what is written on the whiteboard. The equation has one unknown — your job is to find it.',
      'To solve for x, first isolate the term with x on one side. Try subtracting 6 from both sides of the equation.',
      'After subtracting 6 you get 2x = 8. Divide both sides by 2 to find the value of x.',
    ],
  },
  {
    id: 'bookshelf',
    title: 'Hidden Note in Textbook',
    description: 'Solve for y to find the second digit.',
    equation: '3y − 5 = 7',
    correctAnswer: '4',
    rewardDigit: '4',
    hints: [
      'A note tucked inside one of the textbooks contains this equation. The variable y holds the second digit.',
      'Start by adding 5 to both sides of the equation to isolate the term with y.',
      'After adding 5 you get 3y = 12. Divide both sides by 3 to find y.',
    ],
  },
  {
    id: 'teacher-desk',
    title: "Teacher's Note",
    description: 'Find the final digit by solving for z.',
    equation: 'z / 2 + 3 = 8',
    correctAnswer: '10',
    rewardDigit: '0',
    hints: [
      "There is a handwritten note on the teacher's desk. The third digit is hidden inside this equation — solve for z.",
      'Subtract 3 from both sides first. That will leave only the term with z on the left.',
      'After subtracting 3 you have z / 2 = 5. Multiply both sides by 2. Note: the digit you record is the last digit of your answer.',
    ],
  },
];

/** Look up a puzzle definition by its interactable ID. Returns undefined if not found. */
export function getPuzzleById(id: string): PuzzleDefinition | undefined {
  return PUZZLES.find((p) => p.id === id);
}

/** The set of interactable IDs that correspond to algebra puzzles. */
export const PUZZLE_IDS = new Set(PUZZLES.map((p) => p.id));
