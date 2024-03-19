import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {welcomeScreenUI} from '../../Styles';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={welcomeScreenUI.container}>
      <View style={welcomeScreenUI.content}>
        <Text style={welcomeScreenUI.title}>welcome to mymuze!</Text>
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
        <Text style={welcomeScreenUI.newText}>new here? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
          <Text style={welcomeScreenUI.createText}>create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
