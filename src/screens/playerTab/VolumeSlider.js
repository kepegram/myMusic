/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {VolumeManager} from 'react-native-volume-manager';
import Slider from '@react-native-community/slider';

export default function VolumeSlider() {
  const [currentSystemVolume, setReportedSystemVolume] = useState(0);
  const [hideUI, setHideUI] = useState(false);
  const volumeChangedByListener = useRef(true);

  useEffect(() => {
    VolumeManager.showNativeVolumeUI({enabled: !hideUI});
  }, [hideUI]);

  useEffect(() => {
    VolumeManager.getVolume().then(result => {
      setReportedSystemVolume(result.volume);
      console.log('Read system volume', result);
    });

    const volumeListener = VolumeManager.addVolumeListener(result => {
      volumeChangedByListener.current = true;
      setReportedSystemVolume(result.volume);
      console.log('Volume changed', result);
    });

    return () => {
      volumeListener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>iOS / Android</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Current volume:</Text>
            <Text style={styles.text}>
              {Math.round(currentSystemVolume * 100) / 100}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Is muted?:</Text>
            <Text style={styles.text}>
              {currentSystemVolume <= 0 ? 'YES' : 'NO'}
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.text}>
              Volume update {hideUI ? '(without toast)' : '(with toast)'}
            </Text>
          </View>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#999"
            onValueChange={value => {
              VolumeManager.setVolume(value, {showUI: !hideUI});
            }}
            onSlidingComplete={async value => {
              setReportedSystemVolume(value);
            }}
            value={currentSystemVolume}
            step={0.001}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setHideUI(shouldHide => !shouldHide)}>
            <Text style={styles.buttonText}>
              {hideUI ? 'Show native volume Toast' : 'Hide native volume Toast'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    width: Dimensions.get('screen').width - 55,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDD',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
