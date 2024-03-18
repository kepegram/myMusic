import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {welcomeScreenUI} from '../../Styles';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={welcomeScreenUI.container}>
      <View style={welcomeScreenUI.content}>
        <Text style={welcomeScreenUI.title}>Welcome to myMusic!</Text>
        <Text style={welcomeScreenUI.desc}>
          {
            'Please log in or create an account\n to conjour playlists and share your music!'
          }
        </Text>
      </View>
      <View style={welcomeScreenUI.buttonsContainer}>
        <TouchableOpacity
          style={[welcomeScreenUI.button, welcomeScreenUI.login]}
          onPress={() => navigation.navigate('Login Screen')}>
          <Text style={welcomeScreenUI.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={welcomeScreenUI.newUserContainer}>
        <Text style={welcomeScreenUI.newText}>New here? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
          <Text style={welcomeScreenUI.createText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
