/**
 * Puzzle content definitions for Algebra Escape Room.
 *
 * Structure:
 *  - equation, correctAnswer, rewardDigit — locale-invariant (mathematical notation).
 *  - locales — locale-specific text: title, description, and three progressive hints.
 *    Falls back to 'en' when the active locale is not present.
 *
 * hint1 — Directional: points the player toward what deserves attention.
 * hint2 — Conceptual: identifies the relevant mathematical idea.
 * hint3 — Strong guidance: substantial help without giving away the answer.
 */

import type { SupportedLocale } from '../i18n';

export interface PuzzleLocaleContent {
  title: string;
  description: string;
  hints: [string, string, string];
}

export interface PuzzleDefinition {
  /** Must match the InteractableObject id used in the 3D scene. */
  id: string;
  /** Mathematical notation — the same in all locales. */
  equation: string;
  /** The exact string the player must submit (numeric, as a string). */
  correctAnswer: string;
  /** Single digit revealed to the player on success; used to build the door code. */
  rewardDigit: string;
  /**
   * Locale-specific content. 'en' is required; other locales are optional and
   * fall back to 'en' when absent.
   */
  locales: { en: PuzzleLocaleContent } & Partial<Record<SupportedLocale, PuzzleLocaleContent>>;
}

/**
 * A fully-resolved puzzle ready for rendering: locale-invariant fields merged
 * with the best-matching locale content.
 */
export interface LocalizedPuzzle {
  id: string;
  equation: string;
  correctAnswer: string;
  rewardDigit: string;
  title: string;
  description: string;
  hints: [string, string, string];
}

export const PUZZLES: PuzzleDefinition[] = [
  {
    id: 'whiteboard',
    equation: '2x + 6 = 14',
    correctAnswer: '4',
    rewardDigit: '4',
    locales: {
      en: {
        title: 'Whiteboard Problem',
        description: 'Solve the equation to find the first digit of the door code.',
        hints: [
          'Look at what is written on the whiteboard. The equation has one unknown — your job is to find it.',
          'To solve for x, first isolate the term with x on one side. Try subtracting 6 from both sides of the equation.',
          'After subtracting 6 you get 2x = 8. Divide both sides by 2 to find the value of x.',
        ],
      },
      'pt-BR': {
        title: 'Problema do Quadro',
        description: 'Resolva a equação para encontrar o primeiro dígito do código da porta.',
        hints: [
          'Observe o que está escrito no quadro. A equação tem uma incógnita — seu trabalho é encontrá-la.',
          'Para resolver x, primeiro isole o termo com x. Tente subtrair 6 dos dois lados da equação.',
          'Após subtrair 6, você obtém 2x = 8. Divida os dois lados por 2 para encontrar o valor de x.',
        ],
      },
    },
  },
  {
    id: 'bookshelf',
    equation: '3y − 5 = 7',
    correctAnswer: '4',
    rewardDigit: '4',
    locales: {
      en: {
        title: 'Hidden Note in Textbook',
        description: 'Solve for y to find the second digit.',
        hints: [
          'A note tucked inside one of the textbooks contains this equation. The variable y holds the second digit.',
          'Start by adding 5 to both sides of the equation to isolate the term with y.',
          'After adding 5 you get 3y = 12. Divide both sides by 3 to find y.',
        ],
      },
      'pt-BR': {
        title: 'Bilhete Escondido no Livro',
        description: 'Resolva para y e encontre o segundo dígito.',
        hints: [
          'Uma anotação dentro de um dos livros contém esta equação. A variável y guarda o segundo dígito.',
          'Comece somando 5 aos dois lados para isolar o termo com y.',
          'Após somar 5, você obtém 3y = 12. Divida os dois lados por 3 para encontrar y.',
        ],
      },
    },
  },
  {
    id: 'teacher-desk',
    equation: 'z / 2 + 3 = 8',
    correctAnswer: '10',
    rewardDigit: '0',
    locales: {
      en: {
        title: "Teacher's Note",
        description: 'Find the final digit by solving for z.',
        hints: [
          "There is a handwritten note on the teacher's desk. The third digit is hidden inside this equation — solve for z.",
          'Subtract 3 from both sides first. That will leave only the term with z on the left.',
          'After subtracting 3 you have z / 2 = 5. Multiply both sides by 2. Note: the digit you record is the last digit of your answer.',
        ],
      },
      'pt-BR': {
        title: 'Bilhete da Professora',
        description: 'Encontre o dígito final resolvendo para z.',
        hints: [
          'Há uma anotação manuscrita na mesa da professora. O terceiro dígito está escondido nessa equação — resolva para z.',
          'Subtraia 3 dos dois lados primeiro. Isso deixará apenas o termo com z no lado esquerdo.',
          'Após subtrair 3, você tem z / 2 = 5. Multiplique os dois lados por 2. O dígito que você registra é o último dígito da resposta.',
        ],
      },
    },
  },
];

/** Returns the raw definition for a puzzle by interactable id. */
export function getPuzzleById(id: string): PuzzleDefinition | undefined {
  return PUZZLES.find((p) => p.id === id);
}

/**
 * Returns a fully-resolved puzzle for rendering.
 * Falls back to the 'en' locale content when the requested locale is absent.
 */
export function getLocalizedPuzzle(
  id: string,
  locale: SupportedLocale,
): LocalizedPuzzle | undefined {
  const puzzle = PUZZLES.find((p) => p.id === id);
  if (!puzzle) return undefined;
  const content = puzzle.locales[locale] ?? puzzle.locales.en;
  return {
    id: puzzle.id,
    equation: puzzle.equation,
    correctAnswer: puzzle.correctAnswer,
    rewardDigit: puzzle.rewardDigit,
    ...content,
  };
}

/** The set of interactable IDs that correspond to algebra puzzles. */
export const PUZZLE_IDS = new Set(PUZZLES.map((p) => p.id));
