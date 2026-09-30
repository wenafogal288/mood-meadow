import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import theme from '../constants/theme';

interface Props {
  title: string;
  onBack?: () => void;
  rightLabel?: string;
}

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };

/** Single header used by every screen so badges and spacing never drift. */
export default function ScreenHeader({ title, onBack, rightLabel }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.slot}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={HIT}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={styles.back}>
            <ChevronLeft size={24} color={theme.colors.sage} strokeWidth={2.2} />
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.slot, styles.slotRight]}>
        {rightLabel ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{rightLabel}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 44,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line.hairStrong,
  },
  slot: {
    width: 96,
    height: 48,
    justifyContent: 'center',
  },
  slotRight: {
    alignItems: 'flex-end',
  },
  back: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(106,142,94,0.10)',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
    color: theme.colors.text.primary,
  },
  badge: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233,196,106,0.20)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: theme.colors.text.primary,
  },
});
