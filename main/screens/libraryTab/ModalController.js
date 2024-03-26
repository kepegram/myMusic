/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Arrow from 'react-native-vector-icons/AntDesign';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';

export default function ModalController({onNext}) {
  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState('paused');

  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  useEffect(() => {
    if (playbackState === State.Playing) {
      setIsPlaying(State.Playing);
    } else if (playbackState === State.Paused) {
      setIsPlaying(State.Paused);
    } else {
      setIsPlaying(State.Loading);
    }
  }, [playbackState]);

  const renderPlayPauseButton = () => {
    switch (isPlaying) {
      case State.Playing:
        return (
          <Icon
            color={theme === 'light' ? 'black' : 'white'}
            name="pause"
            size={30}
            style={{paddingTop: 2}}
          />
        );
      case State.Paused:
        return (
          <Icon
            color={theme === 'light' ? 'black' : 'white'}
            name="play-arrow"
            size={30}
            style={{paddingTop: 2}}
          />
        );
      default:
        return (
          <ActivityIndicator
            size={30}
            color={theme === 'light' ? 'black' : 'white'}
            style={{paddingTop: 2}}
          />
        );
    }
  };

  const onPause = () => {
    if (playbackState === State.Playing) {
      TrackPlayer.pause();
    } else if (playbackState === State.Paused) {
      TrackPlayer.play();
    }
  };

  return (
    <View
      style={
        theme === 'light' ? controllerUI.container : dmControllerUI.container
      }>
      <TouchableOpacity onPress={onPause}>
        {renderPlayPauseButton()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Arrow
          color={theme === 'light' ? 'black' : 'white'}
          name={'forward'}
          size={20}
          style={{paddingRight: 3, paddingTop: 7}}
        />
      </TouchableOpacity>
    </View>
  );
}

const controllerUI = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingLeft: 240,
    backgroundColor: 'white',
  },
});

const dmControllerUI = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#313131',
    width: '100%',
    paddingLeft: 240,
  },
});
