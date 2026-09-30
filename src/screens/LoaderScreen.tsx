import React, { useEffect, useRef } from 'react';
import { Animated, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ParticleField from '../components/ParticleField';
import { bgLoader, leafMark } from '../assets';
import { LOADER_DURATION_MS, LOADER_PROGRESS_MS } from '../constants/config';
import theme from '../constants/theme';

interface Props {
  onDone: () => void;
}

const BAR_W = 168;
const DARK = [
  theme.colors.loader.top,
  theme.colors.loader.mid,
  theme.colors.loader.bottom,
];

/**
 * Deep-forest brand card. Intentionally the only dark surface in the app so it
 * never reads as a second menu. Nothing here is interactive.
 */
export default function LoaderScreen({ onDone }: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(16)).current;
  const slide = useRef(new Animated.Value(-BAR_W)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }).start();
    Animated.spring(rise, { toValue: 0, tension: 42, friction: 9, useNativeDriver: true }).start();
    Animated.timing(slide, {
      toValue: 0,
      duration: LOADER_PROGRESS_MS,
      useNativeDriver: true,
    }).start();

    const t = setTimeout(onDone, LOADER_DURATION_MS);
    return () => clearTimeout(t);
  }, [fade, rise, slide, onDone]);

  return (
    <ImageBackground source={bgLoader} resizeMode="cover" style={styles.root}>
      <LinearGradient
        colors={DARK}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={[StyleSheet.absoluteFill, styles.wash]}
      />
      <ParticleField />
      <Animated.View
        pointerEvents="box-none"
        style={[styles.center, { opacity: fade, transform: [{ translateY: rise }] }]}>
        <View style={styles.mark}>
          <Image source={leafMark} style={styles.markImage} />
        </View>
        <Text style={styles.brand}>MOOD MEADOW</Text>
        <View style={styles.rule} />
        <Text style={styles.tagline}>A QUIET PLACE FOR FEELINGS</Text>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, { transform: [{ translateX: slide }] }]} />
        </View>
        <Text style={styles.caption}>LOADING…</Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.loader.top,
  },
  wash: {
    opacity: 0.94,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44,
  },
  mark: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 1,
    borderColor: 'rgba(233,196,106,0.35)',
    backgroundColor: 'rgba(233,196,106,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markImage: {
    width: 76,
    height: 76,
    resizeMode: 'contain',
  },
  brand: {
    marginTop: 30,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 4,
    color: theme.colors.text.onDark,
  },
  rule: {
    width: 64,
    height: 1,
    marginTop: 16,
    backgroundColor: 'rgba(233,196,106,0.5)',
  },
  tagline: {
    marginTop: 16,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.6,
    color: theme.colors.loader.subtitle,
  },
  track: {
    width: BAR_W,
    height: 3,
    marginTop: 46,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: theme.colors.loader.track,
  },
  fill: {
    width: BAR_W,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.honey,
  },
  caption: {
    marginTop: 18,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: theme.colors.loader.caption,
  },
});
