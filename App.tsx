import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LoaderScreen from './src/screens/LoaderScreen';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import useEntries from './src/hooks/useEntries';
import type { MoodId } from './src/game/moods';
import { DEFAULT_MOOD } from './src/game/moods';
import theme from './src/constants/theme';

type Screen = 'loader' | 'menu' | 'game' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('loader');
  const {
    entries,
    today,
    todayEntry,
    lastEntry,
    saveEntry,
    week,
    avg,
    streak,
  } = useEntries();

  const goMenu = useCallback(() => setScreen('menu'), []);
  const goGame = useCallback(() => setScreen('game'), []);
  const goResult = useCallback(() => setScreen('result'), []);

  const handleEntryDone = useCallback(
    (moodId: MoodId, tags: string[], note: string) => {
      saveEntry(moodId, tags, note);
      setScreen('result');
    },
    [saveEntry],
  );

  const initialMoodId: MoodId = todayEntry ? todayEntry.moodId : DEFAULT_MOOD;

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle={screen === 'loader' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {screen === 'loader' ? <LoaderScreen onDone={goMenu} /> : null}
      {screen === 'menu' ? (
        <MenuScreen
          today={today}
          streak={streak}
          avg={avg}
          entryCount={entries.length}
          lastEntry={lastEntry}
          onBegin={goGame}
          onWeek={goResult}
        />
      ) : null}
      {screen === 'game' ? (
        <GameScreen
          today={today}
          initialMoodId={initialMoodId}
          onEntryDone={handleEntryDone}
          onBack={goMenu}
        />
      ) : null}
      {screen === 'result' ? (
        <ResultScreen
          today={today}
          week={week}
          entries={entries}
          lastEntry={lastEntry}
          avg={avg}
          streak={streak}
          onLogAgain={goGame}
          onMenu={goMenu}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg.base,
  },
});
