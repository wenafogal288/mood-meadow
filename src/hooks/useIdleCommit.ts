import { useCallback, useEffect, useRef } from 'react';
import {
  AUTO_COMMIT_ENGAGED_MS,
  AUTO_COMMIT_IDLE_MS,
  AUTO_COMMIT_MIN_MS,
} from '../constants/config';

/**
 * Backstop timer: guarantees the screen resolves to a result even when nobody
 * (or an automated runner) taps the primary action. Data for the callback is
 * held in a ref so the timer never closes over stale state.
 */
export function useIdleCommit(onCommit: () => void) {
  const commitRef = useRef(onCommit);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firedRef = useRef(false);
  const mountedAtRef = useRef(Date.now());

  commitRef.current = onCommit;

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const arm = useCallback(
    (ms: number) => {
      clear();
      timerRef.current = setTimeout(() => {
        if (firedRef.current) {
          return;
        }
        firedRef.current = true;
        commitRef.current();
      }, ms);
    },
    [clear],
  );

  /**
   * Call on any user interaction. Shortens the backstop window, but never
   * below the mount floor, so an early tap cannot cut the check-in short
   * before the board has had time to be seen.
   */
  const engage = useCallback(() => {
    if (firedRef.current) {
      return;
    }
    const elapsed = Date.now() - mountedAtRef.current;
    arm(Math.max(AUTO_COMMIT_ENGAGED_MS, AUTO_COMMIT_MIN_MS - elapsed));
  }, [arm]);

  /** Call when the screen resolves by itself — stops the backstop. */
  const cancel = useCallback(() => {
    firedRef.current = true;
    clear();
  }, [clear]);

  useEffect(() => {
    arm(AUTO_COMMIT_IDLE_MS);
    return clear;
  }, [arm, clear]);

  return { engage, cancel };
}

export default useIdleCommit;
