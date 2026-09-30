/**
 * MoodMeadow palette — canonical preset WARM_EARTHY (`name` kept verbatim,
 * only accent hues re-tuned for the botanical-journal brief).
 */
export const theme = {
  name: 'WARM_EARTHY',
  colors: {
    bg: {
      base: '#F4F8EE',
      alt: '#E8F1DE',
      paper: '#FAFCF5',
    },
    surface: {
      card: 'rgba(255,255,255,0.72)',
      cardSolid: '#FFFFFF',
      controls: 'rgba(255,255,255,0.86)',
      soft: 'rgba(255,255,255,0.66)',
    },
    line: {
      hair: 'rgba(40,54,24,0.10)',
      hairStrong: 'rgba(40,54,24,0.14)',
    },
    sage: '#6A8E5E',
    sageDeep: '#55794A',
    sageSoft: '#B7CE9A',
    honey: '#E9C46A',
    terracotta: '#D97B4D',
    text: {
      primary: '#283618',
      secondary: '#5A6B4A',
      muted: '#8A9A7B',
      onDark: '#F4F8EE',
    },
    loader: {
      top: '#101A0E',
      mid: '#1B2A1A',
      bottom: '#283618',
      subtitle: 'rgba(183,206,154,0.75)',
      track: 'rgba(244,248,238,0.14)',
      caption: 'rgba(244,248,238,0.45)',
    },
  },
  radius: {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16,
  },
  space: {
    screenH: 22,
    gap: 10,
  },
} as const;

export type Theme = typeof theme;
export default theme;
