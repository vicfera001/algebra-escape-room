/**
 * Brazilian Portuguese translations for Algebra Escape Room.
 *
 * Must satisfy the `Translations` type exported from en.ts so that any
 * missing or misspelled key is caught at compile time.
 */

import type { Translations } from "./en";

export const ptBR: Translations = {
  start: {
    title: "Escape Room: Álgebra",
    subtitle: "Resolva os enigmas. Encontre o código. Escape.",
    instructions: {
      heading: "Instruções",
      move: "Mova-se pela sala de aula",
      look: "Olhe ao redor (clique para capturar o cursor)",
      interact: "Interaja com os objetos destacados",
      goalLabel: "Objetivo",
      goal: "Resolva 3 equações algébricas para encontrar o código de 3 dígitos da porta.",
    },
    button: "Iniciar Jogo",
  },

  hud: {
    cluesFound: "Pistas Encontradas",
    /** {key} is replaced with the rendered key badge. */
    interactPrompt: "Pressione {key} para Interagir",
  },

  puzzle: {
    correct: "Correto!",
    digitRevealed: "Dígito revelado",
    continue: "Continuar",
    placeholder: "Digite a resposta...",
    wrongAnswer: "Não é bem isso.",
    submit: "Enviar Resposta",
    hintButton: "Dica",
    hintLabel: "Dica {n}",
  },

  door: {
    title: "FECHADURA ELETRÔNICA",
    warning:
      "Encontre os 3 dígitos na sala de aula antes de tentar desbloquear.",
    enter: "ENTRAR",
    unlocked: "DESBLOQUEADO",
  },

  pause: {
    title: "Pausado",
    resume: "Continuar",
    restart: "Reiniciar Jogo",
  },
  completion: {
    title: "Você Escapou!",
    subtitle: "Excelente trabalho.",
    timeTaken: "Tempo Usado",
    puzzles: "Enigmas",
    hintsUsed: "Dicas Usadas",
    playAgain: "Jogar Novamente",
  },
};
