import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Controller({onNext, onPrevious}) {
  return (
    <View style={controllerUI.container}>
      <TouchableOpacity onPress={onPrevious} />
      <TouchableOpacity />
      <TouchableOpacity onPress={onNext} />
    </View>
  );
}

const controllerUI = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
