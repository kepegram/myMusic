import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Appearance,
} from 'react-native';
import {loginScreenUI} from '../../styles/Styles';
import {AuthContext} from '../../context/AuthContext';
import {dmLoginUI} from '../../styles/DarkMode';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert('Please fill out information completely');
    } else {
      login();
    }
  };

  AsyncStorage.setItem('username', username);
  AsyncStorage.setItem('password', password);

  return (
    <View
      style={theme === 'light' ? loginScreenUI.container : dmLoginUI.container}>
      <View style={loginScreenUI.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome Screen')}>
          <Icon
            color={theme === 'light' ? 'black' : 'white'}
            name={'arrow-back'}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={
          theme === 'light' ? loginScreenUI.headerText : dmLoginUI.headerText
        }>
        Login
      </Text>
      <View style={loginScreenUI.inputContainer}>
        <TextInput
          style={loginScreenUI.inputs}
          placeholder="Username"
          placeholderTextColor={'#CBCBCB'}
          value={username}
          underlineColorAndroid="transparent"
          onChangeText={setUsername}
        />
      </View>

      <View style={loginScreenUI.inputContainer}>
        <TextInput
          style={loginScreenUI.inputs}
          placeholder="Password"
          placeholderTextColor={'#CBCBCB'}
          value={password}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[loginScreenUI.buttonContainer, loginScreenUI.loginButton]}
        onPress={() => handleLogin()}>
        <Text style={loginScreenUI.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
