/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text, Appearance} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const formatTime = secs => {
  let minutes = Math.floor(secs / 60);
  let seconds = Math.ceil(secs - minutes * 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export default function SliderComp() {
  const {position, duration} = useProgress();
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  const handleChange = val => {
    TrackPlayer.seekTo(val);
  };

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  return (
    <View>
      <Slider
        style={{width: 360, height: 40}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#C73EFF"
        maximumTrackTintColor="#000000"
        thumbTintColor={theme === 'light' ? '#313131' : 'white'}
        onSlidingComplete={handleChange}
        backgroundColor={theme === 'light' ? null : '#313131'}
      />
      <View
        style={
          theme === 'light' ? timerUI.timerContainer : dmTimerUI.timerContainer
        }>
        <Text
          style={theme === 'light' ? timerUI.timerText : dmTimerUI.timerText}>
          {formatTime(position)}
        </Text>
        <Text
          style={theme === 'light' ? timerUI.timerText : dmTimerUI.timerText}>
          {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
}

const timerUI = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontSize: 13,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const dmTimerUI = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#313131',
  },
  timerText: {
    fontSize: 13,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
