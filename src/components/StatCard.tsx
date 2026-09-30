import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

interface Props {
  value: string;
  label: string;
  valueColor: string;
}

/**
 * Text-first stat pill: an 8px accent dot carries the semantics, so every card
 * in a row is geometrically identical regardless of what it reports.
 */
export default function StatCard({ value, label, valueColor }: Props) {
  return (
    <View style={[styles.card, { borderColor: `${valueColor}55` }]}>
      <View style={[styles.dot, { backgroundColor: valueColor }]} />
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.72)',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
    fontVariant: ['tabular-nums' as const],
  },
  label: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
    color: theme.colors.text.muted,
  },
});
