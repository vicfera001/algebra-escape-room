/**
 * i18n system for Algebra Escape Room.
 *
 * Architecture overview:
 *  - en.ts / pt-BR.ts  — plain objects matching the `Translations` shape.
 *  - index.ts (here)   — maps locale keys to translation objects and
 *                        exports the `useTranslation()` hook.
 *  - store.ts          — holds the active locale; `setLocale` switches it.
 *
 * Usage in a component:
 *   const { t } = useTranslation();
 *   <h1>{t.start.title}</h1>
 *
 * The {key} placeholder in `hud.interactPrompt` is handled by the HUD
 * component, which splits on the literal string "{key}" and renders a
 * <kbd> element in its place.
 */

import { en, type Translations } from './en';
import { ptBR } from './pt-BR';
import { useGameStore } from '../game/store';

export type SupportedLocale = 'en' | 'pt-BR';

export { type Translations };

const translations: Record<SupportedLocale, Translations> = {
  en,
  'pt-BR': ptBR,
};

/**
 * Returns the full translations object for the currently active locale.
 * Falls back to English if a locale entry is somehow missing.
 */
export function useTranslation(): { t: Translations; locale: SupportedLocale } {
  const locale = useGameStore((state) => state.locale);
  const t = translations[locale] ?? translations.en;
  return { t, locale };
}
