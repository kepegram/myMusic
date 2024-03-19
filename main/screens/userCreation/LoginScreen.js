import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {loginScreenUI} from '../../Styles';
import {AuthContext} from '../../context/AuthContext';

const LoginScreen = () => {
  const {login} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert('Please fill out information completely');
    } else {
      login();
    }
  };

  return (
    <View style={loginScreenUI.container}>
      <Text style={loginScreenUI.headerText}>login</Text>
      <View style={loginScreenUI.inputContainer}>
        <TextInput
          style={loginScreenUI.inputs}
          placeholder="username"
          placeholderTextColor={'#CBCBCB'}
          value={username}
          underlineColorAndroid="transparent"
          onChangeText={setUsername}
        />
      </View>

      <View style={loginScreenUI.inputContainer}>
        <TextInput
          style={loginScreenUI.inputs}
          placeholder="password"
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
        <Text style={loginScreenUI.loginText}>login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
