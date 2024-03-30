import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Appearance} from 'react-native';
import {welcomeScreenUI} from '../../styles/Styles';
import {dmWelcomeUI} from '../../styles/DarkMode';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  return (
    <View
      style={
        theme === 'light' ? welcomeScreenUI.container : dmWelcomeUI.container
      }>
      <View style={welcomeScreenUI.content}>
        <Text
          style={theme === 'light' ? welcomeScreenUI.title : dmWelcomeUI.title}>
          welcome to mymuze!
        </Text>
        <Text style={welcomeScreenUI.desc}>
          {
            'please log in or create an account\n to conjour playlists and share your music!'
          }
        </Text>
      </View>
      <View style={welcomeScreenUI.buttonsContainer}>
        <TouchableOpacity
          style={[welcomeScreenUI.button, welcomeScreenUI.login]}
          onPress={() => navigation.navigate('Login Screen')}>
          <Text style={welcomeScreenUI.buttonText}>login</Text>
        </TouchableOpacity>
      </View>
      <View style={welcomeScreenUI.newUserContainer}>
        <Text
          style={
            theme === 'light' ? welcomeScreenUI.newText : dmWelcomeUI.newText
          }>
          new here?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
          <Text style={welcomeScreenUI.createText}>create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
