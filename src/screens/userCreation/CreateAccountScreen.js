/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Appearance,
} from 'react-native';
import {createAccountUI} from '../../styles/Styles';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {dmCreateUI} from '../../styles/DarkMode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccount = () => {
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const handleSubmit = async () => {
    if (name.length === 0 || username.length === 0 || password.length === 0) {
      Alert.alert('Please fill out information completely');
    } else {
      login();
    }
  };

  AsyncStorage.setItem('username', username);
  AsyncStorage.setItem('password', password);

  return (
    <View
      style={
        theme === 'light' ? createAccountUI.container : dmCreateUI.container
      }>
      <View style={createAccountUI.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome Screen')}>
          <Icon
            style={{paddingBottom: 90, paddingRight: 320}}
            color={theme === 'light' ? 'black' : 'white'}
            name={'arrow-back'}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <View style={createAccountUI.form}>
        <Text
          style={theme === 'light' ? createAccountUI.label : dmCreateUI.label}>
          name
        </Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="enter your name"
          placeholderTextColor={'#CBCBCB'}
          value={name}
          onChangeText={setName}
          secureTextEntry={false}
        />
        <Text
          style={theme === 'light' ? createAccountUI.label : dmCreateUI.label}>
          username
        </Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="enter a username"
          placeholderTextColor={'#CBCBCB'}
          value={username}
          onChangeText={setUsername}
          secureTextEntry={false}
        />
        <Text
          style={theme === 'light' ? createAccountUI.label : dmCreateUI.label}>
          password
        </Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="enter a password"
          placeholderTextColor={'#CBCBCB'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={createAccountUI.button} onPress={handleSubmit}>
          <Text style={createAccountUI.buttonText}>create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;
