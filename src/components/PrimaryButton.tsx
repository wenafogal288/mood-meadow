import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PRESS_SPRING } from '../constants/config';
import theme from '../constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  Icon?: React.ComponentType<any>;
}

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const GRADIENT = [theme.colors.sage, theme.colors.sageDeep];

/** h60 gradient CTA. Pressable is the parent; the animated layer is inside. */
export default function PrimaryButton({ label, onPress, Icon }: Props) {
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
        <LinearGradient
          colors={GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fill}>
          <View style={styles.row}>
            {Icon ? <Icon size={24} color={theme.colors.text.onDark} strokeWidth={2.2} /> : null}
            <Text style={styles.label}>{label}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    width: '100%',
    height: 60,
  },
  anim: {
    width: '100%',
    height: 60,
    borderRadius: theme.radius.lg,
    shadowColor: theme.colors.sage,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  fill: {
    width: '100%',
    height: 60,
    borderRadius: theme.radius.lg,
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
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    letterSpacing: 2,
    color: theme.colors.text.onDark,
  },
});
