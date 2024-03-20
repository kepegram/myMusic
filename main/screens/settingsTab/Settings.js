import {StyleSheet, Text, View, Switch, Appearance} from 'react-native';
import React, {useState} from 'react';

export default function Settings() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  Appearance.addChangeListener(scheme => {
    setTheme(scheme);
  });

  return (
    <View
      style={
        theme === 'light'
          ? settingsScreenUI.lightContainer
          : settingsScreenUI.darkContainer
      }>
      <Text
        style={
          theme === 'dark'
            ? settingsScreenUI.whiteText
            : settingsScreenUI.darkText
        }>
        Toggle Theme
      </Text>
      <Switch
        trackColor={{false: '#C73EFF', true: '#81b0ff'}}
        thumbColor={'#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const settingsScreenUI = StyleSheet.create({
  lightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#313131',
  },
  whiteText: {
    color: '#fff',
    fontSize: 14,
  },
  darkText: {
    color: '#000',
    fontSize: 14,
  },
});
