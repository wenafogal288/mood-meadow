import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { BarChart3, Flame, Leaf, Sun } from 'lucide-react-native';
import AppBackground from '../components/AppBackground';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StatCard from '../components/StatCard';
import { meadowHero } from '../assets';
import { SPRING } from '../constants/config';
import theme from '../constants/theme';
import type { Entry } from '../game/insights';
import { moodById } from '../game/moods';
import { shortDate, weekdayLabel } from '../utils/date';

interface Props {
  today: Date;
  streak: number;
  avg: number;
  entryCount: number;
  lastEntry: Entry | null;
  onBegin: () => void;
  onWeek: () => void;
}

function useRiseIn(delay: number) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(value, { toValue: 1, delay, useNativeDriver: true, ...SPRING }).start();
  }, [value, delay]);
  return {
    opacity: value,
    transform: [
      { translateY: value.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
    ],
  };
}

export default function MenuScreen({
  today,
  streak,
  avg,
  entryCount,
  lastEntry,
  onBegin,
  onWeek,
}: Props) {
  const heroIn = useRiseIn(0);
  const cardIn = useRiseIn(90);
  const ctaIn = useRiseIn(180);

  const lastMood = lastEntry ? moodById(lastEntry.moodId) : null;
  const lastText = lastEntry
    ? `${lastMood ? lastMood.label : ''} · ${lastEntry.tags.length} tags`
    : 'No entries yet';
  const showStats = [avg, entryCount, streak].filter(n => n > 0).length >= 2;

  return (
    <AppBackground variant="menu">
      <View style={styles.page}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>
            {`TODAY · ${weekdayLabel(today)} ${shortDate(today)}`}
          </Text>
          <View style={styles.streak}>
            <Flame size={16} color={theme.colors.terracotta} strokeWidth={2.2} />
            <Text style={styles.streakText}>{`${streak} DAYS`}</Text>
          </View>
        </View>

        <Animated.View pointerEvents="box-none" style={[styles.hero, heroIn]}>
          <Text style={styles.heroLine}>MOOD</Text>
          <Text style={[styles.heroLine, styles.heroAccent]}>MEADOW</Text>
          <View style={styles.rule} />
          <Text style={styles.tagline}>Notice how today feels.{'\n'}One tap, one note.</Text>
        </Animated.View>

        <Animated.View pointerEvents="box-none" style={[styles.card, cardIn]}>
          <View style={styles.cardIcon}>
            <Leaf size={24} color={theme.colors.sage} strokeWidth={2} />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardLabel}>LAST ENTRY</Text>
            <Text style={styles.cardValue}>{lastText}</Text>
          </View>
        </Animated.View>

        {showStats ? (
          <View style={styles.stats}>
            <View style={styles.statSlot}>
              <StatCard value={avg.toFixed(1)} label="AVG MOOD" valueColor={theme.colors.sage} />
            </View>
            <View style={styles.statSlot}>
              <StatCard value={`${entryCount}`} label="ENTRIES" valueColor={theme.colors.honey} />
            </View>
            <View style={styles.statSlot}>
              <StatCard value={`${streak}`} label="STREAK" valueColor={theme.colors.terracotta} />
            </View>
          </View>
        ) : null}

        <View style={styles.spacer} pointerEvents="none">
          <Image source={meadowHero} style={styles.heroArt} />
        </View>

        <Text style={styles.hint}>PICK A MOOD · ADD A TAG</Text>

        <Animated.View pointerEvents="box-none" style={ctaIn}>
          <PrimaryButton label="START CHECK-IN" Icon={Sun} onPress={onBegin} />
        </Animated.View>

        <View style={styles.secondary}>
          <SecondaryButton label="WEEK REVIEW" Icon={BarChart3} onPress={onWeek} />
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 22,
    paddingBottom: 28,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 34,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.sage,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(106,142,94,0.28)',
    backgroundColor: 'rgba(106,142,94,0.10)',
  },
  streakText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  hero: {
    marginTop: 26,
    alignItems: 'flex-start',
  },
  heroLine: {
    fontSize: 46,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: theme.colors.text.primary,
  },
  heroAccent: {
    color: theme.colors.sage,
  },
  rule: {
    width: 88,
    height: 1,
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: theme.colors.line.hairStrong,
  },
  tagline: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    maxWidth: 220,
  },
  card: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line.hair,
    backgroundColor: theme.colors.surface.card,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(106,142,94,0.12)',
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.muted,
  },
  cardValue: {
    marginTop: 3,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  stats: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  statSlot: {
    flex: 1,
  },
  spacer: {
    flex: 1,
    minHeight: 36,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroArt: {
    width: 150,
    height: '100%',
    maxHeight: 148,
    resizeMode: 'contain',
    opacity: 0.95,
  },
  hint: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.muted,
    marginBottom: 10,
  },
  secondary: {
    marginTop: 14,
  },
});
