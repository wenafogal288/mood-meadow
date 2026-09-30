import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  Icon?: React.ComponentType<any>;
}

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };

/** h48 hairline button. Same icon metrics as PrimaryButton (24px / lh 24). */
export default function SecondaryButton({ label, onPress, Icon }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const down = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, ...PRESS_SPRING }).start();
  };
  const up = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, ...PRESS_SPRING }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={down}
      onPressOut={up}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={styles.press}>
      <Animated.View style={[styles.anim, { transform: [{ scale }] }]}>
        <View style={styles.row}>
          {Icon ? <Icon size={24} color={theme.colors.sage} strokeWidth={2} /> : null}
          <Text style={styles.label}>{label}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    width: '100%',
    height: 48,
  },
  anim: {
    width: '100%',
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line.hairStrong,
    backgroundColor: 'rgba(255,255,255,0.70)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    fontSize: 13,
    lineHeight: 24,
    fontWeight: '800',
    letterSpacing: 2,
    color: theme.colors.text.primary,
  },
});
