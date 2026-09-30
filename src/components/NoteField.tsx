import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NOTE_LINES } from '../game/moods';
import theme from '../constants/theme';

interface Props {
  value: string;
  onChange: (next: string) => void;
}

const HIT = { top: 8, bottom: 8, left: 6, right: 6 };

/**
 * One-tap note. Deliberately keyboard-free: preset lines keep the check-in to
 * a single gesture and stop the soft keyboard from covering the controls.
 */
export default function NoteField({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.caption}>ADD A LINE (OPTIONAL)</Text>
      <View style={styles.row}>
        {NOTE_LINES.map(line => {
          const active = value === line;
          return (
            <Pressable
              key={line}
              onPress={() => onChange(active ? '' : line)}
              hitSlop={HIT}
              accessibilityRole="button"
              accessibilityLabel={line}
              style={[styles.chip, active ? styles.chipActive : null]}>
              <Text style={[styles.text, active ? styles.textActive : null]}>{line}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  caption: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.muted,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    height: 38,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line.hair,
    backgroundColor: theme.colors.surface.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    borderColor: theme.colors.sage,
    backgroundColor: 'rgba(106,142,94,0.14)',
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  textActive: {
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
});
