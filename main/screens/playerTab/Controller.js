import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';

export default function Controller({onNext, onPrevious}) {
  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState('paused');

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
        return <Icon color="black" name="pause" size={45} />;
      case State.Paused:
        return <Icon color="black" name="play-arrow" size={45} />;
      default:
        return <ActivityIndicator size={45} color="black" />;
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
    <View style={controllerUI.container}>
      <TouchableOpacity onPress={onPrevious}>
        <Icon color={'black'} name={'skip-previous'} size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPause}>
        {renderPlayPauseButton()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Icon color={'black'} name={'skip-next'} size={45} />
      </TouchableOpacity>
    </View>
  );
}

const controllerUI = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
});
