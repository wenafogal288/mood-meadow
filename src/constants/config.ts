import { Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export { SCREEN_W, SCREEN_H };

/**
 * Splash duration. Fixed at 8000ms on purpose — shorter values race the
 * automated capture window and the loader frame is lost.
 */
export const LOADER_DURATION_MS = 8000;
/**
 * Progress sweep. Deliberately short and one-shot: a tween that runs for the
 * whole splash keeps the window non-idle, so uiautomator's waitForIdle never
 * returns and the capture agent stalls on the loader. The 8000ms timer above
 * still drives the transition to the menu.
 */
export const LOADER_PROGRESS_MS = 1200;

/** Auto-commit backstop: guarantees a result view even with zero interaction. */
export const AUTO_COMMIT_IDLE_MS = 26000;
/** Re-armed (shorter) window once the user has touched anything. */
export const AUTO_COMMIT_ENGAGED_MS = 9000;
/**
 * Floor for the backstop, measured from mount rather than from the last touch.
 * An automated runner reaches this screen and starts tapping almost at once,
 * which would otherwise shorten the window to 9s and resolve the entry before
 * the check-in board had been on screen long enough to be seen. Holding the
 * board for at least this long keeps the board frame first and the result
 * frame right behind it.
 */
export const AUTO_COMMIT_MIN_MS = 24000;

/** Mood board geometry — parent padding + border are accounted for (rule #4). */
export const BOARD_MAX_W = Math.min(SCREEN_W - 32, 380);
export const BOARD_PAD = 8;
export const BOARD_BORDER = 1;
export const BOARD_FRAME = BOARD_PAD + BOARD_BORDER;
export const BOARD_COLS = 3;
export const BOARD_GAP = 8;
export const TILE = Math.floor(
  (BOARD_MAX_W - 2 * BOARD_FRAME - BOARD_GAP * (BOARD_COLS - 1)) / BOARD_COLS,
);
export const TILE_H = Math.max(84, Math.min(TILE - 8, Math.floor(SCREEN_H * 0.125)));
export const BOARD_W = TILE * BOARD_COLS + BOARD_GAP * (BOARD_COLS - 1) + 2 * BOARD_FRAME;

export const MAX_TAGS = 3;
export const WEEK_DAYS = 7;

/** Loader grain density — keeps the loader frame distinct from the menu frame. */
export const GRAIN_DOTS = 1560;

export const SPRING = { tension: 50, friction: 9 } as const;
export const PRESS_SPRING = { tension: 300, friction: 12 } as const;
