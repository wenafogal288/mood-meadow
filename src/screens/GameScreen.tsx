import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Save } from 'lucide-react-native';
import AppBackground from '../components/AppBackground';
import ScreenHeader from '../components/ScreenHeader';
import MoodTile from '../components/MoodTile';
import TagChip from '../components/TagChip';
import NoteField from '../components/NoteField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import {
  BOARD_BORDER,
  BOARD_GAP,
  BOARD_PAD,
  BOARD_W,
  MAX_TAGS,
  SPRING,
} from '../constants/config';
import theme from '../constants/theme';
import type { Mood, MoodId } from '../game/moods';
import { DEFAULT_MOOD, MOODS, TAGS, moodById } from '../game/moods';
import useIdleCommit from '../hooks/useIdleCommit';
import { shortDate } from '../utils/date';

interface Props {
  today: Date;
  initialMoodId: MoodId;
  onEntryDone: (moodId: MoodId, tags: string[], note: string) => void;
  onBack: () => void;
}

const ROW_ONE = MOODS.slice(0, 3);
const ROW_TWO = MOODS.slice(3);

export default function GameScreen({ today, initialMoodId, onEntryDone, onBack }: Props) {
  const [moodId, setMoodId] = useState<MoodId>(initialMoodId || DEFAULT_MOOD);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const enter = useRef(new Animated.Value(0)).current;
  const doneRef = useRef(false);

  useEffect(() => {
    Animated.spring(enter, { toValue: 1, useNativeDriver: true, ...SPRING }).start();
  }, [enter]);

  const commit = useCallback(
    (id: MoodId, list: string[], line: string) => {
      if (doneRef.current) {
        return;
      }
      doneRef.current = true;
      onEntryDone(id, list, line);
    },
    [onEntryDone],
  );

  const { engage, cancel } = useIdleCommit(() => commit(moodId, tags, note));

  const finish = useCallback(() => {
    cancel();
    commit(moodId, tags, note);
  }, [cancel, commit, moodId, tags, note]);

  const pickMood = useCallback(
    (mood: Mood) => {
      engage();
      setMoodId(mood.id);
    },
    [engage],
  );

  const toggleTag = useCallback(
    (label: string) => {
      engage();
      setTags(prev => {
        if (prev.indexOf(label) >= 0) {
          return prev.filter(t => t !== label);
        }
        if (prev.length >= MAX_TAGS) {
          return prev;
        }
        return prev.concat(label);
      });
    },
    [engage],
  );

  const changeNote = useCallback(
    (next: string) => {
      engage();
      setNote(next);
    },
    [engage],
  );

  const selected = moodById(moodId);
  const fade = {
    opacity: enter,
    transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
  };

  return (
    <AppBackground variant="game">
      <ScreenHeader title="TODAY" onBack={onBack} rightLabel={shortDate(today)} />

      <Animated.View pointerEvents="box-none" style={[styles.area, fade]}>
        <Text style={styles.question}>HOW DOES TODAY FEEL?</Text>

        <View style={styles.board}>
          <View style={styles.boardRow}>
            {ROW_ONE.map(mood => (
              <MoodTile
                key={mood.id}
                mood={mood}
                selected={mood.id === moodId}
                onPress={pickMood}
              />
            ))}
          </View>
          <View style={[styles.boardRow, styles.boardRowLast]}>
            {ROW_TWO.map(mood => (
              <MoodTile
                key={mood.id}
                mood={mood}
                selected={mood.id === moodId}
                onPress={pickMood}
              />
            ))}
          </View>
        </View>

        <View style={styles.tagsBlock}>
          <Text style={styles.caption}>WHAT SHAPED IT?</Text>
          <View style={styles.tagsRow}>
            {TAGS.map(tag => (
              <TagChip
                key={tag}
                label={tag}
                active={tags.indexOf(tag) >= 0}
                onPress={toggleTag}
              />
            ))}
          </View>
        </View>

        <View style={styles.noteBlock}>
          <NoteField value={note} onChange={changeNote} />
        </View>
      </Animated.View>

      <View style={styles.controls}>
        <View style={styles.preview}>
          <Text style={styles.previewLabel}>SELECTED</Text>
          <Text style={[styles.previewValue, { color: selected.color }]}>{selected.label}</Text>
        </View>
        <PrimaryButton label="SAVE & GO" Icon={Save} onPress={finish} />
        <View style={styles.skip}>
          <SecondaryButton label="SKIP FOR NOW" onPress={finish} />
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  question: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: 0.6,
    textAlign: 'center',
    color: theme.colors.text.primary,
    marginBottom: 10,
  },
  board: {
    width: BOARD_W,
    alignSelf: 'center',
    padding: BOARD_PAD,
    borderWidth: BOARD_BORDER,
    borderColor: theme.colors.line.hair,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: BOARD_GAP,
  },
  boardRowLast: {
    marginTop: BOARD_GAP,
  },
  tagsBlock: {
    marginTop: 14,
  },
  caption: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.muted,
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noteBlock: {
    marginTop: 14,
  },
  controls: {
    backgroundColor: theme.colors.surface.controls,
    borderTopWidth: 1,
    borderTopColor: theme.colors.line.hair,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.text.muted,
  },
  previewValue: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  skip: {
    marginTop: 8,
  },
});
