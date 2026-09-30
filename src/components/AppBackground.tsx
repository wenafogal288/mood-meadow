import React from 'react';
import type { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { bgGame, bgMenu } from '../assets';
import theme from '../constants/theme';

type Variant = 'menu' | 'game' | 'result';

interface Props {
  variant: Variant;
  children: ReactNode;
}

const SOURCES = {
  menu: bgMenu,
  game: bgGame,
  result: bgGame,
};

const OVERLAYS: Record<Variant, string[]> = {
  menu: ['rgba(244,248,238,0.86)', 'rgba(232,241,222,0.94)'],
  game: ['rgba(244,248,238,0.90)', 'rgba(236,244,226,0.95)'],
  result: ['rgba(240,246,232,0.92)', 'rgba(228,238,216,0.96)'],
};

const LEAF = 'M60 2C28 10 4 36 2 68c30 0 56-22 58-52 0-5 0-9 0-14z';

/** Image backdrop + gradient wash + oversized cropped leaf decor. */
export default function AppBackground({ variant, children }: Props) {
  const colors = OVERLAYS[variant];
  return (
    <ImageBackground source={SOURCES[variant]} resizeMode="cover" style={styles.root}>
      <LinearGradient
        colors={colors}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={[styles.decor, styles.decorTop]}>
        <Svg width={190} height={190} viewBox="0 0 62 70">
          <Path d={LEAF} fill={theme.colors.sageSoft} fillOpacity={0.18} />
        </Svg>
      </View>
      <View pointerEvents="none" style={[styles.decor, styles.decorBottom]}>
        <Svg width={230} height={230} viewBox="0 0 62 70">
          <Path d={LEAF} fill={theme.colors.sage} fillOpacity={0.12} />
        </Svg>
      </View>
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg.base,
  },
  content: {
    flex: 1,
  },
  decor: {
    position: 'absolute',
  },
  decorTop: {
    top: -46,
    right: -54,
    transform: [{ rotate: '24deg' }],
  },
  decorBottom: {
    bottom: -84,
    left: -78,
    transform: [{ rotate: '-148deg' }],
  },
});
