import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { TILE, TILE_H } from '../constants/config';
import theme from '../constants/theme';
import type { Mood } from '../game/moods';

interface Props {
  mood: Mood;
  selected: boolean;
  onPress: (mood: Mood) => void;
}

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };

export default function MoodTile({ mood, selected, onPress }: Props) {
  const scale = useRef(new Animated.Value(selected ? 1.04 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.04 : 1,
      tension: 160,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [selected, scale]);

  return (
    <Pressable
      onPress={() => onPress(mood)}
      hitSlop={HIT}
      accessibilityRole="button"
      accessibilityLabel={mood.label}
      style={styles.press}>
      <Animated.View
        style={[
          styles.tile,
          selected ? { borderColor: mood.color, backgroundColor: 'rgba(106,142,94,0.14)', borderWidth: 2 } : null,
          { transform: [{ scale }] },
        ]}>
        <Image source={mood.sprite} style={styles.sprite} />
        <Text style={[styles.label, selected ? { color: theme.colors.text.primary } : null]}>
          {mood.label}
        </Text>
        {selected ? (
          <View style={styles.check}>
            <Check size={16} color={theme.colors.sage} strokeWidth={3} />
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    width: TILE,
    height: TILE_H,
  },
  tile: {
    width: TILE,
    height: TILE_H,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line.hair,
    backgroundColor: theme.colors.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.text.secondary,
  },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
