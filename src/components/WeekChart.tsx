import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_W } from '../constants/config';
import theme from '../constants/theme';
import type { DayCell } from '../game/insights';

interface Props {
  days: DayCell[];
}

const CARD_W = SCREEN_W - 44;
const INNER = CARD_W - 32;
const BAR_GAP = 8;
const BAR_W = Math.floor((INNER - BAR_GAP * 6) / 7);
const MAX_BAR = 108;
const EMPTY_BAR = 4;
const BAR_TINTS = [theme.colors.sageSoft, theme.colors.sage];
const TODAY_TINTS = [theme.colors.honey, '#D9A94A'];

/**
 * Seven day columns. Column height is a layout prop, so these tweens run on
 * the JS driver — the only place in the app that does.
 */
export default function WeekChart({ days }: Props) {
  const targets = useMemo(
    () => days.map(d => (d.score > 0 ? EMPTY_BAR + (d.score / 5) * MAX_BAR : EMPTY_BAR)),
    [days],
  );
  const anims = useRef(days.map(() => new Animated.Value(EMPTY_BAR))).current;

  useEffect(() => {
    const runs = anims.map((a, i) =>
      Animated.timing(a, {
        toValue: targets[i],
        duration: 420,
        delay: i * 60,
        useNativeDriver: false,
      }),
    );
    Animated.parallel(runs).start();
  }, [anims, targets]);

  return (
    <View style={styles.card}>
      <Text style={styles.caption}>THIS WEEK</Text>
      <View style={styles.row}>
        {days.map((d, i) => (
          <View key={d.label} style={styles.col}>
            <View style={styles.barSlot}>
              <Animated.View style={[styles.bar, { height: anims[i] }]} pointerEvents="none">
                {d.score > 0 ? (
                  <LinearGradient
                    colors={d.isToday ? TODAY_TINTS : BAR_TINTS}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.barFill}
                  />
                ) : (
                  <View style={styles.barEmpty} />
                )}
              </Animated.View>
            </View>
            <Text style={[styles.day, d.isToday ? styles.dayToday : null]}>{d.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 16,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line.hair,
    backgroundColor: 'rgba(255,255,255,0.78)',
  },
  caption: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.text.muted,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  col: {
    width: BAR_W,
    alignItems: 'center',
  },
  barSlot: {
    width: BAR_W,
    height: MAX_BAR + EMPTY_BAR,
    justifyContent: 'flex-end',
  },
  bar: {
    width: BAR_W,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    height: '100%',
  },
  barEmpty: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(40,54,24,0.12)',
  },
  day: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: theme.colors.text.muted,
  },
  dayToday: {
    color: theme.colors.text.primary,
  },
});
