import React, {useContext, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {createAccountUI} from '../../Styles';
import {AuthContext} from '../../context/AuthContext';

const CreateAccount = () => {
  const {login} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (name.length === 0 || username.length === 0 || password.length === 0) {
      Alert.alert('Please fill out information completely');
    } else {
      login();
    }
  };

  return (
    <View style={createAccountUI.container}>
      <View style={createAccountUI.form}>
        <Text style={createAccountUI.label}>Name</Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="Enter your name"
          placeholderTextColor={'black'}
          value={name}
          onChangeText={setName}
          secureTextEntry={false}
        />
        <Text style={createAccountUI.label}>Username</Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="Enter a username"
          placeholderTextColor={'black'}
          value={username}
          onChangeText={setUsername}
          secureTextEntry={false}
        />
        <Text style={createAccountUI.label}>Password</Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="Enter a password"
          placeholderTextColor={'black'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={createAccountUI.button} onPress={handleSubmit}>
          <Text style={createAccountUI.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;
