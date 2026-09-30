import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../constants/theme';

interface Props {
  label: string;
  active: boolean;
  onPress: (label: string) => void;
}

const HIT = { top: 8, bottom: 8, left: 6, right: 6 };

export default function TagChip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(label)}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.chip, active ? styles.chipActive : null]}>
      <Text style={[styles.text, active ? styles.textActive : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 38,
    minWidth: 56,
    paddingHorizontal: 13,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line.hair,
    backgroundColor: theme.colors.surface.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    borderColor: theme.colors.honey,
    backgroundColor: 'rgba(233,196,106,0.20)',
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1,
    color: theme.colors.text.secondary,
  },
  textActive: {
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
});
