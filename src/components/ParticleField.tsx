import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { GRAIN_DOTS, SCREEN_H, SCREEN_W } from '../constants/config';

interface Props {
  count?: number;
}

const TINTS = [
  { fill: '#3E5C36', opacity: 0.22 },
  { fill: '#6A8E5E', opacity: 0.2 },
  { fill: '#B7CE9A', opacity: 0.16 },
  { fill: '#E9C46A', opacity: 0.14 },
  { fill: '#8FB07C', opacity: 0.18 },
  { fill: '#F4F8EE', opacity: 0.1 },
];

/**
 * Static botanical grain for the splash. Rendered as a handful of dense SVG
 * paths (one per tint) rather than thousands of nodes, so the first paint
 * stays cheap while the frame keeps a lot of high-frequency detail.
 * Deterministic xorshift32 placement, memoised — nothing animates here.
 */
export default function ParticleField({ count = GRAIN_DOTS }: Props) {
  const paths = useMemo(() => {
    let seed = 0x9e3779b9;
    const rand = () => {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      return ((seed >>> 0) % 100000) / 100000;
    };
    const buckets: string[] = TINTS.map(() => '');
    const per = Math.max(1, Math.floor(count / TINTS.length));
    for (let t = 0; t < TINTS.length; t += 1) {
      let d = '';
      for (let i = 0; i < per; i += 1) {
        const x = Math.round(rand() * SCREEN_W * 10) / 10;
        const y = Math.round(rand() * SCREEN_H * 10) / 10;
        const s = rand() > 0.72 ? 1.6 : 1;
        d += `M${x} ${y}h${s}v${s}h-${s}z`;
      }
      buckets[t] = d;
    }
    return buckets;
  }, [count]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width={SCREEN_W} height={SCREEN_H}>
        {paths.map((d, i) => (
          <Path key={`grain-${i}`} d={d} fill={TINTS[i].fill} fillOpacity={TINTS[i].opacity} />
        ))}
      </Svg>
    </View>
  );
}
