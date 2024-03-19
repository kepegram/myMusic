/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
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

  const handleChange = val => {
    TrackPlayer.seekTo(val);
  };

  return (
    <View>
      <Slider
        style={{width: 360, height: 40}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#C73EFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="black"
        onSlidingComplete={handleChange}
      />
      <View style={timerUI.timerContainer}>
        <Text style={timerUI.timerText}>{formatTime(position)}</Text>
        <Text style={timerUI.timerText}>{formatTime(duration)}</Text>
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
