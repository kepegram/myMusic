/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Appearance, StyleSheet, View} from 'react-native';
import {VolumeManager} from 'react-native-volume-manager';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function VolumeSlider() {
  const [currentSystemVolume, setReportedSystemVolume] = useState(0);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const volumeChangedByListener = useRef(true);

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  useEffect(() => {
    VolumeManager.showNativeVolumeUI({enabled: false});
  }, []);

  useEffect(() => {
    VolumeManager.getVolume().then(result => {
      setReportedSystemVolume(result.volume);
    });

    const volumeListener = VolumeManager.addVolumeListener(result => {
      volumeChangedByListener.current = true;
      setReportedSystemVolume(result.volume);
    });

    return () => {
      volumeListener.remove();
    };
  }, []);

  return (
    <View style={styles.row}>
      <Icon
        name="volume-off"
        size={20}
        color={theme === 'light' ? 'black' : 'white'}
      />
      <Slider
        style={{width: 300, height: 20}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#C73EFF"
        maximumTrackTintColor="grey"
        onValueChange={value => {
          VolumeManager.setVolume(value, {showUI: false});
        }}
        onSlidingComplete={async value => {
          setReportedSystemVolume(value);
        }}
        value={currentSystemVolume}
        step={0.001}
        thumbTintColor={theme === 'light' ? 'black' : 'white'}
        backgroundColor={theme === 'light' ? null : 'black'}
      />
      <Icon
        name="volume-up"
        size={20}
        color={theme === 'light' ? 'black' : 'white'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    flexWrap: 'wrap',
  },
});
